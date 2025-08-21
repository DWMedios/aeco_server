import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import type { IAecoPayload } from '@aecos/domain/Types'
import type {
  DecodedAeco,
  DecodedUser,
  ForgotPasswordDecodedUser,
  VerifiiedUserDecodedUser,
} from '@shared/domain/Types'

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): DecodedUser => {
    const request = ctx.switchToHttp().getRequest()
    return request['user'] as DecodedUser
  },
)

export const CurrentForgotPasswordUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): ForgotPasswordDecodedUser => {
    const request = ctx.switchToHttp().getRequest()
    return request['forgotPasswordUser'] as ForgotPasswordDecodedUser
  },
)

export const CurrentVerifyEmailUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): VerifiiedUserDecodedUser => {
    const request = ctx.switchToHttp().getRequest()
    return request['verifyEmailUser'] as VerifiiedUserDecodedUser
  },
)

export const CurrentAeco = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): DecodedAeco => {
    const request = ctx.switchToHttp().getRequest()
    return request['decodedAeco'] as DecodedAeco
  },
)

export const AccessControlAeco = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IAecoPayload => {
    const request = ctx.switchToHttp().getRequest()
    return request['aecoPayload'] as IAecoPayload
  },
)
