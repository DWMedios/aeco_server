import { Request, Response, NextFunction } from 'express'
import {
  NestMiddleware,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { authorization }: any = req?.headers
    const apiKey = req?.headers['x-api-key'] as string

    if (!apiKey) {
      throw new UnauthorizedException('API Key is required')
    }

    if (!authorization || authorization.trim() === '') {
      throw new UnauthorizedException('Token is required')
    }
    next()
  }
  catch(error: Error) {
    throw error
  }
}
