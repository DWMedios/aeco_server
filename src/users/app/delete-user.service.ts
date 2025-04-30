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
  MEDIA_ASSET_REPOSITORY,
  type IRoleRepository,
  type IUserRepository,
  type IMediaAssetRepository,
} from '@shared/domain/repositories'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import { type IS3Service, S3_SERVICE } from '@shared/domain/services/IS3Service'
import type { IDeleteUserService } from '@users/domain/services/IDeleteUserService'

@Injectable()
export class DeleteUserService implements IDeleteUserService {
  logger = new Logger(DeleteUserService.name)

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
    @Inject(MEDIA_ASSET_REPOSITORY)
    private readonly mediaRepository: IMediaAssetRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
    @Inject(S3_SERVICE)
    private readonly s3Service: IS3Service,
  ) {}

  async run(id: number): Promise<{ success: boolean }> {
    const user = await this.userRepository.findById(id, false)

    if (!user) throw new NotFoundException('El usuario no existe')

    const isDeleted = await this.transactionService.executeTransaction(
      async (manager) => {
        let deletedUSer: boolean = false

        if (user?.imageId) {
          try {
            const image = await this.mediaRepository.findById(
              user.imageId,
              manager,
            )
            if (image) {
              const s3Key = `dw/${decodeURIComponent(image.fileKey)}`
              const fileExists = await this.s3Service.fileExist(s3Key)
              let fileDeleted = false
              if (fileExists) {
                fileDeleted = await this.s3Service.deleteFile(s3Key)
              }
              if (fileDeleted) {
                await this.mediaRepository.softDelete(user.imageId, manager)
              }
            }
          } catch (error) {
            this.logger.error(error)
            throw new BadRequestException('Error al eliminar la imagen')
          }
        }

        try {
          await this.userRepository.partialUpdate(
            user,
            { isActive: false },
            manager,
          )
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
