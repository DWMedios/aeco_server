import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Company, User } from '@common/infra/entities'
import { COMPANY_REPOSITORY, USER_REPOSITORY } from '@shared/domain/repositories'
import { CompanyRepository, UserRepository } from '@shared/infra/repositories'
import { UserController } from './infra/user.controller'
import { USER_SERVICE } from './domain/IUserService'
import { UserService } from './app/user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, Company])],
  providers: [
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: COMPANY_REPOSITORY,
      useClass: CompanyRepository,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
