import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name)

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'http') {
      return this.logHttpCall(context, next)
    }
  }

  private logHttpCall(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest()
    const userAgent = request.get('user-agent') || ''
    const { ip, method, path: url } = request
    const correlationKey = request.headers['x-correlation-id'] || uuidv4()
    request.headers['x-correlation-id'] = correlationKey

    this.logger.log(
      `[${correlationKey}] ${method} ${url} ${userAgent} ${ip}: ${
        context.getClass().name
      } ${context.getHandler().name}`,
    )

    const now = Date.now()
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse()

        const { statusCode } = response

        this.logger.log(
          `[${correlationKey}] ${method} ${url} ${statusCode}: ${
            Date.now() - now
          }ms`,
        )
      }),
    )
  }
}
