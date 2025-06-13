import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import type { IAecoPayload } from '@aecos/domain/Types'
import type { DecodedAeco, DecodedUser } from '@shared/domain/Types'

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): DecodedUser => {
    const request = ctx.switchToHttp().getRequest()
    return request['user'] as DecodedUser
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
