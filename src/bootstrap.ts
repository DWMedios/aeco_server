import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  const configService = app.get(ConfigService)
  const port = configService.get('config.port')
  console.log(`Server running on port ${port}`)
  await app.listen(port)
}
bootstrap()
