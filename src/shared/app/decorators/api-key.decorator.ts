import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common'

export const ApiKey = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest()
    const apiKey = request.headers['x-api-key']

    if (!apiKey) {
      throw new BadRequestException('API key is required')
    }

    return apiKey
  },
)
