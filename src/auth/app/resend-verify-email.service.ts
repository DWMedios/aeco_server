import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  USER_REPOSITORY,
  USER_INVITE_REPOSITORY,
  type IUserRepository,
  type IUserInviteRepository,
} from '@shared/domain/repositories'
import {
  EMAIL_SERVICE,
  type IEmailService,
} from '@shared/domain/services/email-service.interface'
import {
  JWT_SERVICE,
  type IJwtService,
} from '@auth/domain/services/IJwtService'
import { UserInviteTypeEnum } from '@common/domain/enums/UserInviteType.enum'
import { UserInviteStatusEnum } from '@common/domain/enums/UserInviteStatus.enum'
import type { ResetPasswordEmailTemplateModel } from '@shared/domain/Types'
import type { IResendVerifyEmailService } from '@auth/domain/services/IResendVerifyEmailService'

@Injectable()
export class ResendVerifyEmailService implements IResendVerifyEmailService {
  logger = new Logger(ResendVerifyEmailService.name)
  private readonly templateId: number
  private readonly frontUrl: string

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(USER_INVITE_REPOSITORY)
    private readonly userInviteRepository: IUserInviteRepository,
    @Inject(JWT_SERVICE)
    private readonly jwtService: IJwtService,
    @Inject(EMAIL_SERVICE)
    private readonly emailService: IEmailService,
    private readonly configService: ConfigService,
  ) {
    this.frontUrl = this.configService.get<string>('config.frontend_url')

    this.templateId = this.configService.get<number>(
      'postmark.templates.email_verification',
    )
  }

  async run(userId: number): Promise<{ success: boolean }> {
    const user = await this.userRepository.findById(userId, true, false)
    if (!user) {
      throw new NotFoundException('Usuario no encontrado')
    }

    const userInvite = await this.userInviteRepository.findBy({
      email: user.email,
      invitedUserId: user.id,
      inviteType: UserInviteTypeEnum.EMAIL_VERIFICATION,
      status: UserInviteStatusEnum.PENDING,
    })

    if (!userInvite) {
      throw new NotFoundException('Invitación no encontrada')
    }

    const company = user.company
    if (!company) {
      throw new NotFoundException('Empresa no encontrada')
    }

    const role = user.role
    if (!role || !role.apiKey) {
      throw new NotFoundException('Rol de usuario no encontrado')
    }

    const emailVerificationToken = this.jwtService.signVerifiedEmail({
      email: user?.email,
      sub: role.apiKey,
      companyName: company.name,
    })

    let success = false
    try {
      await this.userInviteRepository.updateManyByUser(
        user.id,
        { status: UserInviteStatusEnum.CANCELLED },
        UserInviteTypeEnum.EMAIL_VERIFICATION,
        UserInviteStatusEnum.PENDING,
      )

      const createInvite = await this.userInviteRepository.create({
        token: emailVerificationToken,
        email: user.email,
        invitedUserId: user.id,
        inviteType: UserInviteTypeEnum.EMAIL_VERIFICATION,
        status: UserInviteStatusEnum.PENDING,
      })
      success = !!createInvite
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al crear la invitación de verificación de email',
      )
    }

    if (success) {
      const emailVerificationUrl = `${this.frontUrl}/verify-email?token=${emailVerificationToken}`
      const templateModel: ResetPasswordEmailTemplateModel = {
        product_url: 'AECO',
        product_name: 'AECO',
        name: user?.name,
        company_name: company.name,
        company_address: company?.address,
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
    }

    return { success }
  }
}
