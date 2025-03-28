import { v4 as uuidv4 } from 'uuid'
import { Injectable, Inject, BadRequestException, Logger } from '@nestjs/common'
import {
  COMPANY_REPOSITORY,
  ROLE_REPOSITORY,
  SETTING_REPOSITORY,
  USER_REPOSITORY,
  AECO_REPOSITORY,
  type IRoleRepository,
  type ICompanyRepository,
  type ISettingRepository,
  type IUserRepository,
  type IAecoRepository,
} from '@shared/domain/repositories'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import type { CreateCompanyDto } from '@company/domain/dto/CreateCompany.dto'
import type { IAeco, ICompany, IUser } from '@common/domain/entities'
import type { ICreateCompanyService } from '@company/domain/services/ICreateCompanyService'
import { UserRoleEntiyEnum } from '@common/domain/enums/UserRole.enum'

@Injectable()
export class CreateCompanyService implements ICreateCompanyService {
  logger = new Logger(CreateCompanyService.name)

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
    @Inject(SETTING_REPOSITORY)
    private readonly settingRepository: ISettingRepository,
    @Inject(AECO_REPOSITORY)
    private readonly aecoRepository: IAecoRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(request: CreateCompanyDto): Promise<ICompany> {
    const { userAdmin, legalRepresentative, settings, aecos, ...reqCompany } =
      request

    const exists = await this.companyRepository.exists({
      name: reqCompany.name,
    })

    if (exists) throw new BadRequestException('La empresa ya existe')

    if (userAdmin?.email) {
      const userEmailExists = await this.userRepository.exists(userAdmin.email)

      if (userEmailExists) {
        throw new BadRequestException('El email del usuario ya existe')
      }
    }

    let aecosExists: IAeco[] = []
    if (aecos?.length > 0) {
      aecosExists = await this.aecoRepository.findManyByIds({
        ids: aecos,
        companyNullable: true,
      })
      if (aecosExists.length !== aecos.length) {
        throw new BadRequestException('Algunos aecos no existen')
      }
    }

    const companyTransaction = await this.transactionService.executeTransaction(
      async (manager) => {
        let newCompany: ICompany | null = null
        try {
          newCompany = await this.companyRepository.create(
            {
              ...reqCompany,
              ...(legalRepresentative && { legalRepresentative }),
              ...(aecosExists.length > 0 && { aecos: aecosExists }),
            },
            manager,
          )
        } catch (error) {
          this.logger.error(error)
          throw new BadRequestException('Error al crear la empresa')
        }

        try {
          await this.settingRepository.create(
            {
              ...settings,
              companyId: newCompany.id,
            },
            manager,
          )
        } catch (error) {
          this.logger.error(error)
          throw new BadRequestException(
            'Error al crear la configuración de la empresa',
          )
        }

        if (userAdmin) {
          let newUserAdmin: IUser | null = null
          try {
            newUserAdmin = await this.userRepository.create(
              {
                ...userAdmin,
                companyId: newCompany.id,
              },
              manager,
            )
          } catch (error) {
            throw new BadRequestException('Error al crear el usuario')
          }

          try {
            await this.roleRepository.create(
              {
                userId: newUserAdmin.id,
                role: UserRoleEntiyEnum.ADMIN,
                apiKey: uuidv4(),
              },
              manager,
            )
          } catch (error) {
            throw new BadRequestException('Error al asignar el rol al usuario')
          }
        }

        return newCompany
      },
    )

    return await this.companyRepository.findById(companyTransaction.id)
  }
}
