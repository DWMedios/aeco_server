import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { randomUUID } from 'crypto'

export const CORRELATION_ID_HEADER = 'x-correlation-id'

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const id = randomUUID()
    req.headers[CORRELATION_ID_HEADER] = id
    res.setHeader(CORRELATION_ID_HEADER, id)
    next()
  }
}
