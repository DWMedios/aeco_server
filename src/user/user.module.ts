import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Company, User } from '@infra-entities'
import { COMPANY_REPOSITORY, USER_REPOSITORY } from '@domain-repositories'
import { CompanyRepository, UserRepository } from '@infra-repositories'
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
