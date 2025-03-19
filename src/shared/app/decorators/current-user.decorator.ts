import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import type { DecodedUser } from '@shared/domain/Types'

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): DecodedUser => {
    const request = ctx.switchToHttp().getRequest()
    return request['user'] as DecodedUser
  },
)
