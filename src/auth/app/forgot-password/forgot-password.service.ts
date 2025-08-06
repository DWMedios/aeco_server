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
  type IUserRepository,
} from '@shared/domain/repositories'
import {
  JWT_SERVICE,
  type IJwtService,
} from '@auth/domain/services/IJwtService'
import {
  EMAIL_SERVICE,
  type IEmailService,
} from '@shared/domain/services/email-service.interface'
import type { ForgotPasswordDto } from '@auth/domain/dto/forgot-password.dto'
import type { ResetPasswordEmailTemplateModel } from '@shared/domain/Types'
import type { IForgotPasswordService } from '@auth/domain/services/IForgotPasswordService'

@Injectable()
export class ForgotPasswordService implements IForgotPasswordService {
  logger = new Logger(ForgotPasswordService.name)
  private readonly templateId: number
  private readonly frontUrl: string

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(JWT_SERVICE)
    private readonly jwtService: IJwtService,
    @Inject(EMAIL_SERVICE)
    private readonly emailService: IEmailService,
    private readonly configService: ConfigService,
  ) {
    this.frontUrl = this.configService.get<string>('config.frontend_url')

    this.templateId = this.configService.get<number>(
      'postmark.templates.password_reset',
    )
  }

  async run(data: ForgotPasswordDto): Promise<{ success: boolean }> {
    const { email } = data
    const user = await this.userRepository.findForValidation(email)

    if (!user || (!user.isActive && !user.isVerified)) {
      throw new NotFoundException('Usuario no encontrado')
    }

    const role = user.role

    const resetToken = this.jwtService.signResetPassword({
      email,
      sub: role.apiKey,
    })

    const resetUrl = `${this.frontUrl}/reset-password?token=${resetToken}`

    const company = user.company

    const templateModel: ResetPasswordEmailTemplateModel = {
      product_url: 'AECO',
      product_name: 'AECO',
      name: user.name,
      company_name: company?.name || 'Empresa no disponible',
      company_address: company?.address || 'Dirección no disponible',
      action_url: resetUrl,
    }

    try {
      const response = await this.emailService.sendEmailWithTemplate({
        to: user.email,
        templateId: this.templateId,
        templateModel,
      })

      const success = response?.Message === 'OK' ? true : false
      return { success }
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(
        'Error al enviar el correo electrónico de restablecimiento de contraseña',
      )
    }
  }
}
