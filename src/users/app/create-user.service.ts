import { v4 as uuidv4 } from 'uuid'
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
import type { CreateUserDto } from '@users/domain/dto/CreateUser.dto'
import type { ICreateUserService } from '@users/domain/services/ICreateUserService'

@Injectable()
export class CreateUserService implements ICreateUserService {
  logger = new Logger(CreateUserService.name)

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

  async run(request: CreateUserDto): Promise<Partial<IUser>> {
    const { role, ...user } = request

    const companyExists = await this.companyRepository.exists({
      id: user.companyId,
    })

    if (!companyExists) throw new NotFoundException('La empresa no existe')

    const exists = await this.userRepository.exists(request.email)
    if (exists) throw new BadRequestException('El email del usuario ya existe')

    const userTransaction = await this.transactionService.executeTransaction(
      async (manager) => {
        let newUser: IUser | null = null
        try {
          newUser = await this.userRepository.create(user, manager)
        } catch (error) {
          throw new BadRequestException('Error al crear el usuario')
        }

        try {
          await this.roleRepository.create(
            {
              userId: newUser.id,
              role: role as unknown as UserRoleEntiyEnum,
              apiKey: uuidv4(),
            },
            manager,
          )
        } catch (error) {
          throw new BadRequestException('Error al asignar el rol al usuario')
        }
        return newUser
      },
    )

    return await this.userRepository.findById(userTransaction.id)
  }
}
