import { Module } from '@nestjs/common'
import { SharedModule } from '@shared/shared.module'
import { PostUserController } from './infra/controllers/post-user.controller'
import { CREATE_USER_SERVICE } from './domain/services/ICreateUserService'
import { CreateUserService } from './app/create-user.service'
import { FIND_USER_SERVICE } from './domain/services/IFindUserService'
import { FindUserService } from './app/find-user.service'
import { GetUserController } from './infra/controllers/get-user.controller'
import { UPDATE_USER_SERVICE } from './domain/services/IUpdateUserService'
import { UpdateUserService } from './app/update-user.service'
import { PutUserController } from './infra/controllers/put-user.controller'
import { DELETE_USER_SERVICE } from './domain/services/IDeleteUserService'
import { DeleteUserService } from './app/delete-user.service'
import { DeleteUserController } from './infra/controllers/delete-user.controller'
import { FIND_ALL_USER_SERVICE } from './domain/services/IFindAllUserService'
import { FindAllUserService } from './app/find-all-user.service'
import { GetAllUsersController } from './infra/controllers/get-all-users.controller'

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: CREATE_USER_SERVICE,
      useClass: CreateUserService,
    },
    {
      provide: FIND_USER_SERVICE,
      useClass: FindUserService,
    },
    {
      provide: UPDATE_USER_SERVICE,
      useClass: UpdateUserService,
    },
    {
      provide: DELETE_USER_SERVICE,
      useClass: DeleteUserService,
    },
    {
      provide: FIND_ALL_USER_SERVICE,
      useClass: FindAllUserService,
    },
  ],
  controllers: [
    // Rutas de users (más genéricas a más específicas)
    GetAllUsersController, // GET /users
    GetUserController, // GET /users/:id
    PostUserController, // POST /users
    PutUserController, // PUT /users/:id
    DeleteUserController, // DELETE /users/:id
  ],
})
export class UsersModule {}
