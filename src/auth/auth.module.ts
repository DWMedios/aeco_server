import { Module } from '@nestjs/common'
import { SharedModule } from '@shared/shared.module'
import { JWT_SERVICE } from './domain/services/IJwtService'
import { JwtService } from './app/jwt/jwt.service'
import { AUTH_SERVICE } from './domain/services/IAuthService'
import { AuthService } from './app/auth/auth.service'
import { LoginController } from './infra/controllers/auth-login.controller'
import { RESET_INTERNAL_PASSWORD_SERVICE } from './domain/services/IResetInternalPasswordService'
import { ResetInternalPasswordService } from './app/reset-password/reset-internal-password.service'
import { ResetPasswordController } from './infra/controllers/reset-password.controller'
import { FORGOT_PASSWORD_SERVICE } from './domain/services/IForgotPasswordService'
import { ForgotPasswordService } from './app/forgot-password/forgot-password.service'

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
      provide: FORGOT_PASSWORD_SERVICE,
      useClass: ForgotPasswordService,
    },
  ],
  controllers: [LoginController, ResetPasswordController],
  exports: [JWT_SERVICE, AUTH_SERVICE],
})
export class AuthModule {}
