import { v4 as uuidv4 } from 'uuid'
import { ConfigService } from '@nestjs/config'
import { Injectable, Inject, BadRequestException, Logger } from '@nestjs/common'
import {
  ROLE_REPOSITORY,
  USER_REPOSITORY,
  AECO_REPOSITORY,
  COMPANY_REPOSITORY,
  USER_INVITE_REPOSITORY,
  MEDIA_ASSET_REPOSITORY,
  type IRoleRepository,
  type IUserRepository,
  type IAecoRepository,
  type ICompanyRepository,
  type IMediaAssetRepository,
  type IUserInviteRepository,
} from '@shared/domain/repositories'
import {
  JWT_SERVICE,
  type IJwtService,
} from '@auth/domain/services/IJwtService'
import {
  EMAIL_SERVICE,
  type IEmailService,
} from '@shared/domain/services/email-service.interface'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import type {
  IAeco,
  ICompany,
  IMediaAsset,
  IUser,
} from '@common/domain/entities'
import { UserRoleEntityEnum } from '@common/domain/enums/UserRole.enum'
import { UserInviteTypeEnum } from '@common/domain/enums/UserInviteType.enum'
import { UserInviteStatusEnum } from '@common/domain/enums/UserInviteStatus.enum'
import type { ResetPasswordEmailTemplateModel } from '@shared/domain/Types'
import type { CreateCompanyDto } from '@company/domain/dto/CreateCompany.dto'
import type { ICreateCompanyService } from '@company/domain/services/ICreateCompanyService'

@Injectable()
export class CreateCompanyService implements ICreateCompanyService {
  logger = new Logger(CreateCompanyService.name)
  private readonly templateId: number
  private readonly frontUrl: string

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
    @Inject(AECO_REPOSITORY)
    private readonly aecoRepository: IAecoRepository,
    @Inject(MEDIA_ASSET_REPOSITORY)
    private readonly mediaRepository: IMediaAssetRepository,
    @Inject(USER_INVITE_REPOSITORY)
    private readonly userInviteRepository: IUserInviteRepository,
    @Inject(JWT_SERVICE)
    private readonly jwtService: IJwtService,
    @Inject(EMAIL_SERVICE)
    private readonly emailService: IEmailService,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
    private readonly configService: ConfigService,
  ) {
    this.frontUrl = this.configService.get<string>('config.frontend_url')

    this.templateId = this.configService.get<number>(
      'postmark.templates.email_verification',
    )
  }

  async run(request: CreateCompanyDto): Promise<ICompany> {
    const { userAdmin, legalRepresentative, mediaAsset, aecos, ...reqCompany } =
      request

    const existsByName = await this.companyRepository.exists({
      name: reqCompany.name,
    })

    if (existsByName) throw new BadRequestException('La empresa ya existe')

    const existsByRfc = await this.companyRepository.exists({
      rfc: reqCompany.rfc,
    })

    if (existsByRfc) throw new BadRequestException('El RFC ya existe')

    if (userAdmin?.email) {
      const userEmailExists = await this.userRepository.exists(userAdmin.email)

      if (userEmailExists) {
        throw new BadRequestException('El email del usuario ya existe')
      }
    }

    let aecosExists: IAeco[] = []
    if (aecos?.length > 0) {
      aecosExists = await this.aecoRepository.findManyByIds({
        ids: aecos,
        companyNullable: true,
      })
      if (aecosExists.length !== aecos.length) {
        throw new BadRequestException('Algunos aecos no existen')
      }
    }

    const apiKey = uuidv4()
    const emailVerificationToken = this.jwtService.signVerifiedEmail({
      email: userAdmin?.email,
      sub: apiKey,
      companyName: reqCompany.name,
    })

    const companyTransaction = await this.transactionService.executeTransaction(
      async (manager) => {
        let newCompany: ICompany | null = null
        let newMedia: IMediaAsset | null = null

        if (mediaAsset) {
          try {
            newMedia = await this.mediaRepository.create(
              {
                fileKey: mediaAsset.fileKey,
                originalName: mediaAsset.originalName,
                mimeType: mediaAsset.mimeType,
                assetType: mediaAsset.assetType,
                ...(mediaAsset?.fileSize && { fileSize: mediaAsset.fileSize }),
              },
              manager,
            )
          } catch (error) {
            this.logger.error(error)
            throw new BadRequestException(
              'Error al crear el logo de la empresa',
            )
          }
        }

        try {
          newCompany = await this.companyRepository.create(
            {
              ...reqCompany,
              ...(newMedia && { logoId: newMedia.id }),
              ...(reqCompany.metadata && { metadata: reqCompany.metadata }),
              ...(legalRepresentative && { legalRepresentative }),
              ...(aecosExists.length > 0 && { aecos: aecosExists }),
            },
            manager,
          )
        } catch (error) {
          this.logger.error(error)
          throw new BadRequestException('Error al crear la empresa')
        }

        if (userAdmin) {
          let newUserAdmin: IUser | null = null
          try {
            newUserAdmin = await this.userRepository.create(
              {
                ...userAdmin,
                companyId: newCompany.id,
                isVerified: false,
              },
              manager,
            )
          } catch (error) {
            throw new BadRequestException('Error al crear el usuario')
          }

          try {
            await this.roleRepository.create(
              {
                userId: newUserAdmin.id,
                role: UserRoleEntityEnum.ADMIN,
                apiKey,
              },
              manager,
            )

            await this.userInviteRepository.create(
              {
                token: emailVerificationToken,
                email: newUserAdmin.email,
                invitedUserId: newUserAdmin.id,
                inviteType: UserInviteTypeEnum.EMAIL_VERIFICATION,
                status: UserInviteStatusEnum.PENDING,
              },
              manager,
            )
          } catch (error) {
            throw new BadRequestException('Error al asignar el rol al usuario')
          }
        }

        return newCompany
      },
    )

    const emailVerificationUrl = `${this.frontUrl}/verify-email?token=${emailVerificationToken}`
    const templateModel: ResetPasswordEmailTemplateModel = {
      product_url: 'AECO',
      product_name: 'AECO',
      name: userAdmin?.name,
      company_name: reqCompany.name,
      company_address: reqCompany?.address,
      action_url: emailVerificationUrl,
    }

    try {
      const response = await this.emailService.sendEmailWithTemplate({
        to: userAdmin?.email,
        templateId: this.templateId,
        templateModel,
      })
      this.logger.log(`Email sent successfully: ${response?.MessageID}`)
    } catch (error) {
      this.logger.error(error)
    }

    return await this.companyRepository.findById(companyTransaction.id)
  }
}
