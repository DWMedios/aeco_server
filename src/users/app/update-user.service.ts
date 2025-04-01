import {
  Injectable,
  Inject,
  Logger,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common'
import {
  USER_REPOSITORY,
  COMPANY_REPOSITORY,
  ROLE_REPOSITORY,
  type IUserRepository,
  type ICompanyRepository,
  type IRoleRepository,
} from '@shared/domain/repositories'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import { UserRoleEntiyEnum } from '@common/domain/enums/UserRole.enum'
import type { IUser } from '@common/domain/entities'
import type { UpdateUserDto } from '@users/domain/dto/UpdateUser.dto'
import type { IUpdateUserService } from '@users/domain/services/IUpdateUserService'

@Injectable()
export class UpdateUserService implements IUpdateUserService {
  logger = new Logger(UpdateUserService.name)

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(userId: number, request: UpdateUserDto): Promise<Partial<IUser>> {
    const { role, ...userToUpdate } = request

    const findUser = await this.userRepository.findById(userId)
    if (!findUser) throw new NotFoundException('El usuario no existe')

    if (userToUpdate?.companyId) {
      const companyExists = await this.companyRepository.exists({
        id: userToUpdate.companyId,
      })
      if (!companyExists) throw new NotFoundException('La empresa no existe')
    }

    if (userToUpdate?.email) {
      const exists = await this.userRepository.exists(userToUpdate.email)
      if (exists) throw new BadRequestException('El email ya existe')
    }

    const userTransaction = await this.transactionService.executeTransaction(
      async (manager) => {
        let user: IUser | null = null
        try {
          user = await this.userRepository.update(
            findUser,
            userToUpdate,
            manager,
          )
        } catch (error) {
          throw new BadRequestException('Error al actualizar el usuario')
        }

        if (role && findUser.role) {
          try {
            await this.roleRepository.update(
              findUser.role,
              {
                role: role as unknown as UserRoleEntiyEnum,
              },
              manager,
            )
          } catch (error) {
            throw new BadRequestException('Error al actualizar el rol')
          }
        }

        return user
      },
    )

    return await this.userRepository.findById(userTransaction.id)
  }
}
