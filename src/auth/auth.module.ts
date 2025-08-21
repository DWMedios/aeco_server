import { Module } from '@nestjs/common'
import { SharedModule } from '@shared/shared.module'
import { JWT_SERVICE } from './domain/services/IJwtService'
import { JwtService } from './app/jwt.service'
import { AUTH_SERVICE } from './domain/services/IAuthService'
import { AuthService } from './app/auth.service'
import { LoginController } from './infra/controllers/auth-login.controller'
import { RESET_INTERNAL_PASSWORD_SERVICE } from './domain/services/IResetInternalPasswordService'
import { ResetInternalPasswordService } from './app/reset-password/reset-internal-password.service'
import { ResetPasswordInternalController } from './infra/controllers/reset-password-internal.controller'
import { FORGOT_PASSWORD_SERVICE } from './domain/services/IForgotPasswordService'
import { ForgotPasswordService } from './app/forgot-password.service'
import { VERIFY_RESET_PASSWORD_TOKEN_SERVICE } from './domain/services/IVerifyResetPasswordService'
import { VerifyResetPasswordTokenService } from './app/verify-token/verify-reset-password-token.service'
import { ForgotPasswordController } from './infra/controllers/forgot-password.controller'
import { VerifyResetPasswordTokenController } from './infra/controllers/verify-reset-password-token.controller'
import { RESET_EXTERNAL_PASSWORD_SERVICE } from './domain/services/IResetExternalPasswordService'
import { ResetExternalPasswordService } from './app/reset-password/reset-external-password.service'
import { ResetPasswordExternalController } from './infra/controllers/reset-password-external.controller'
import { VERIFY_EMAIL_TOKEN_SERVICE } from './domain/services/IVerifyEmailTokenService'
import { VerifyEmailTokenService } from './app/verify-token/verify-email-token.service'
import { RESEND_VERIFY_EMAIL_SERVICE } from './domain/services/IResendVerifyEmailService'
import { ResendVerifyEmailService } from './app/resend-verify-email.service'
import { ResendVerifyEmailController } from './infra/controllers/resend-verify-email.controller'

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: JWT_SERVICE,
      useClass: JwtService,
    },
    {
      provide: AUTH_SERVICE,
      useClass: AuthService,
    },
    {
      provide: RESET_INTERNAL_PASSWORD_SERVICE,
      useClass: ResetInternalPasswordService,
    },
    {
      provide: RESET_EXTERNAL_PASSWORD_SERVICE,
      useClass: ResetExternalPasswordService,
    },
    {
      provide: FORGOT_PASSWORD_SERVICE,
      useClass: ForgotPasswordService,
    },
    {
      provide: VERIFY_RESET_PASSWORD_TOKEN_SERVICE,
      useClass: VerifyResetPasswordTokenService,
    },
    {
      provide: VERIFY_EMAIL_TOKEN_SERVICE,
      useClass: VerifyEmailTokenService,
    },
    {
      provide: RESEND_VERIFY_EMAIL_SERVICE,
      useClass: ResendVerifyEmailService,
    },
  ],
  controllers: [
    LoginController,
    ResetPasswordInternalController,
    ForgotPasswordController,
    VerifyResetPasswordTokenController,
    ResetPasswordExternalController,
    ResendVerifyEmailController,
  ],
  exports: [JWT_SERVICE, AUTH_SERVICE],
})
export class AuthModule {}
