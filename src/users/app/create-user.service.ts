import { v4 as uuidv4 } from 'uuid'
import { ConfigService } from '@nestjs/config'
import {
  Injectable,
  Inject,
  Logger,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  USER_REPOSITORY,
  ROLE_REPOSITORY,
  COMPANY_REPOSITORY,
  MEDIA_ASSET_REPOSITORY,
  USER_INVITE_REPOSITORY,
  type IUserRepository,
  type IRoleRepository,
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
import { UserRoleEntityEnum } from '@common/domain/enums/UserRole.enum'
import { UserInviteTypeEnum } from '@common/domain/enums/UserInviteType.enum'
import { UserInviteStatusEnum } from '@common/domain/enums/UserInviteStatus.enum'
import type { IMediaAsset, IUser } from '@common/domain/entities'
import type { CreateUserDto } from '@users/domain/dto/CreateUser.dto'
import type { ResetPasswordEmailTemplateModel } from '@shared/domain/Types'
import type { ICreateUserService } from '@users/domain/services/ICreateUserService'

@Injectable()
export class CreateUserService implements ICreateUserService {
  logger = new Logger(CreateUserService.name)
  private readonly templateId: number
  private readonly frontUrl: string

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
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

  async run(request: CreateUserDto): Promise<IUser> {
    const { role, mediaAsset, ...user } = request

    const companyExists = await this.companyRepository.findById(user.companyId)

    if (!companyExists) throw new NotFoundException('La empresa no existe')

    const exists = await this.userRepository.exists(request.email)
    if (exists) throw new BadRequestException('El email del usuario ya existe')

    const apiKey = uuidv4()
    const emailVerificationToken = this.jwtService.signVerifiedEmail({
      email: user?.email,
      sub: apiKey,
      companyName: companyExists.name,
    })

    const userTransaction = await this.transactionService.executeTransaction(
      async (manager) => {
        let newUser: IUser | null = null
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
            throw new InternalServerErrorException(
              'Error al crear la imagen del usuario',
            )
          }
        }

        try {
          newUser = await this.userRepository.create(
            {
              ...user,
              ...(mediaAsset && { imageId: newMedia?.id }),
              isVerified: false,
            },
            manager,
          )
        } catch (error) {
          this.logger.error(error)
          throw new InternalServerErrorException('Error al crear el usuario')
        }

        try {
          await this.roleRepository.create(
            {
              userId: newUser.id,
              role: role as unknown as UserRoleEntityEnum,
              apiKey,
            },
            manager,
          )

          await this.userInviteRepository.create(
            {
              token: emailVerificationToken,
              email: user.email,
              invitedUserId: newUser.id,
              inviteType: UserInviteTypeEnum.EMAIL_VERIFICATION,
              status: UserInviteStatusEnum.PENDING,
            },
            manager,
          )
        } catch (error) {
          this.logger.error(error)
          throw new InternalServerErrorException(
            'Error al asignar el rol al usuario',
          )
        }
        return newUser
      },
    )

    const emailVerificationUrl = `${this.frontUrl}/verify-email?token=${emailVerificationToken}`
    const templateModel: ResetPasswordEmailTemplateModel = {
      product_url: 'AECO',
      product_name: 'AECO',
      name: user?.name,
      company_name: companyExists.name,
      company_address: companyExists?.address,
      action_url: emailVerificationUrl,
    }

    try {
      const response = await this.emailService.sendEmailWithTemplate({
        to: user?.email,
        templateId: this.templateId,
        templateModel,
      })
      this.logger.log(`Email sent successfully: ${response?.MessageID}`)
    } catch (error) {
      this.logger.error(error)
    }

    return await this.userRepository.findByIdResponse(userTransaction.id)
  }
}
