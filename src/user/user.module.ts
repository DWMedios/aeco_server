import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './app/user.service';
import { USER_SERVICE } from './domain/IUserService';
import { UserController } from './infra/user.controller';
import { User } from '../common/infra/entities/User.entity';
import { USER_REPOSITORY } from '../shared/domain/repositories/IUserRepository';
import { UserRepository } from '../shared/infra/repositories/UserRepository';
import { COMPANY_REPOSITORY } from '../shared/domain/repositories/ICompanyRepository';
import { CompanyRepository } from '../shared/infra/repositories/CompanyRepository';
import { Company } from '../common/infra/entities/Company.entity';

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
