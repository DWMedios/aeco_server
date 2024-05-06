import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { USER_SERVICE } from './domain/IUserService';
import { UserController } from './user.controller';
import { User } from '../common/infra/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
