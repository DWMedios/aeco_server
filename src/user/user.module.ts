import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { USER_SERVICE } from './domain/IUserService';
import { UserController } from './user.controller';
import { User } from '../common/infra/entities/User.entity';
import { USER_REPOSITORY } from '../shared/domain/repositories/IUserRepository';
import { UserRepository } from '../shared/infra/repositories/UserRepository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
