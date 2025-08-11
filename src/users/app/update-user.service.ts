import { ConfigService } from '@nestjs/config'
import {
  Injectable,
  Inject,
  Logger,
  BadRequestException,
  NotFoundException,
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
import type { IUser } from '@common/domain/entities'
import type { UpdateUserDto } from '@users/domain/dto/UpdateUser.dto'
import type { IUpdateUserService } from '@users/domain/services/IUpdateUserService'
import { UserInviteTypeEnum } from '@common/domain/enums/UserInviteType.enum'
import { UserInviteStatusEnum } from '@common/domain/enums/UserInviteStatus.enum'
import { ResetPasswordEmailTemplateModel } from '@shared/domain/Types'

@Injectable()
export class UpdateUserService implements IUpdateUserService {
  logger = new Logger(UpdateUserService.name)
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

  async run(userId: number, request: UpdateUserDto): Promise<IUser> {
    const { role, mediaAsset, ...userToUpdate } = request

    const findUser = await this.userRepository.findById(userId)
    if (!findUser) throw new NotFoundException('El usuario no existe')

    if (userToUpdate?.companyId) {
      const companyExists = await this.companyRepository.exists({
        id: userToUpdate.companyId,
      })
      if (!companyExists) throw new NotFoundException('La empresa no existe')
    }

    const hasChangeEmail =
      userToUpdate?.email && userToUpdate.email !== findUser.email
    let emailVerificationToken: string | null = null
    if (hasChangeEmail) {
      const exists = await this.userRepository.exists(userToUpdate.email)
      if (exists) throw new BadRequestException('El email ya existe')

      const role = findUser?.role
      const company = findUser?.company
      emailVerificationToken = this.jwtService.signVerifiedEmail({
        email: findUser?.email,
        sub: role.apiKey,
        companyName: company.name,
      })
    }

    const userTransaction = await this.transactionService.executeTransaction(
      async (manager) => {
        let user: IUser | null = null
        try {
          user = await this.userRepository.partialUpdate(
            findUser,
            {
              ...userToUpdate,
              ...(hasChangeEmail ? { isVerified: false } : {}),
            },
            manager,
          )
        } catch (error) {
          throw new BadRequestException('Error al actualizar el usuario')
        }

        if (role && findUser.role) {
          try {
            await this.roleRepository.partialUpdate(
              findUser.role,
              {
                role: role as unknown as UserRoleEntityEnum,
              },
              manager,
            )
          } catch (error) {
            throw new BadRequestException('Error al actualizar el rol')
          }
        }

        if (mediaAsset && findUser?.imageId) {
          try {
            await this.mediaRepository.updateById(
              findUser.imageId,
              mediaAsset,
              manager,
            )
          } catch (error) {
            this.logger.error(error)
            throw new BadRequestException(
              'Error al actualizar la imagen del usuario',
            )
          }
        } else if (mediaAsset && !findUser?.imageId) {
          try {
            const mediaAssetCreated = await this.mediaRepository.create(
              mediaAsset,
              manager,
            )

            await this.userRepository.updateById(
              findUser.id,
              { imageId: mediaAssetCreated.id },
              manager,
            )
          } catch (error) {
            this.logger.error(error)
            throw new BadRequestException(
              'Error al crear la imagen del usuario',
            )
          }
        }

        if (hasChangeEmail && emailVerificationToken) {
          try {
            await this.userInviteRepository.updateManyByUser(
              findUser.id,
              { status: UserInviteStatusEnum.CANCELLED },
              UserInviteTypeEnum.EMAIL_VERIFICATION,
              UserInviteStatusEnum.PENDING,
              manager,
            )

            await this.userInviteRepository.create(
              {
                token: emailVerificationToken,
                email: findUser.email,
                invitedUserId: findUser.id,
                inviteType: UserInviteTypeEnum.EMAIL_VERIFICATION,
                status: UserInviteStatusEnum.PENDING,
              },
              manager,
            )
          } catch (error) {
            throw new BadRequestException(
              'Error al crear la invitación de verificación de email',
            )
          }
        }

        return user ?? findUser
      },
    )

    if (hasChangeEmail && emailVerificationToken) {
      const company = findUser?.company
      const emailVerificationUrl = `${this.frontUrl}/verify-email?token=${emailVerificationToken}`
      const templateModel: ResetPasswordEmailTemplateModel = {
        product_url: 'AECO',
        product_name: 'AECO',
        name: findUser?.name,
        company_name: company.name,
        company_address: company?.address,
        action_url: emailVerificationUrl,
      }

      try {
        const response = await this.emailService.sendEmailWithTemplate({
          to: findUser?.email,
          templateId: this.templateId,
          templateModel,
        })
        this.logger.log(`Email sent successfully: ${response?.MessageID}`)
      } catch (error) {
        this.logger.error(error)
      }
    }

    return await this.userRepository.findById(userTransaction.id)
  }
}
