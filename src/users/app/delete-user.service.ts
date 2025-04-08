import {
  Injectable,
  Inject,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import {
  ROLE_REPOSITORY,
  USER_REPOSITORY,
  type IRoleRepository,
  type IUserRepository,
} from '@shared/domain/repositories'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import type { IDeleteUserService } from '@users/domain/services/IDeleteUserService'

@Injectable()
export class DeleteUserService implements IDeleteUserService {
  logger = new Logger(DeleteUserService.name)

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(id: number): Promise<{ success: boolean }> {
    const user = await this.userRepository.findById(id, false)

    if (!user) throw new NotFoundException('El usuario no existe')

    const isDeleted = await this.transactionService.executeTransaction(
      async (manager) => {
        let deletedUSer: boolean = false
        try {
          await this.userRepository.update(user, { isActive: false }, manager)
          deletedUSer = await this.userRepository.softDelete(id, manager)
        } catch (error) {
          throw new BadRequestException('Error al eliminar el usuario')
        }

        try {
          if (deletedUSer) {
            const role = user.role
            await this.roleRepository.softDelete(role.id, manager)
          }
        } catch (error) {
          throw new BadRequestException('Error al eliminar el rol del usuario')
        }
        return deletedUSer
      },
    )

    return { success: isDeleted }
  }
}
