import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import type { ICompany } from '../../../common/domain/entities/ICompany'
import { Company } from '../../../common/infra/entities/Company.entity'
import type { PresignedGetUrlDto } from '../../../dms/domain/dtos/PresignedGetUrlDto'
import type { PresignedUploadUrlDto } from '../../../dms/domain/dtos/PresignedUploadUrlDto'
import type { IDmsRepository } from '../../../shared/domain/repositories/IDmsRepository'

export class DmsRepository implements IDmsRepository {
  private client: S3Client
  private bucketName = this.configService.get('S3_BUCKET_NAME')

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<ICompany>,
  ) {
    const s3_region = this.configService.get('S3_REGION')

    if (!s3_region) {
      throw new Error('S3_REGION not found in environment variables')
    }

    this.client = new S3Client({
      region: s3_region,
      credentials: {
        accessKeyId: this.configService.get('S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY'),
      },
      forcePathStyle: true,
    })
  }

  async generatePresignedUploadUrl({
    fileType,
    companyId,
  }: PresignedUploadUrlDto): Promise<{ url: string; key: string }> {
    const company = this.companyRepository.findOne({
      where: { id: companyId },
    })
    if (!company) throw new Error('Company not found')
    try {
      const mime =
        fileType === 'mp4'
          ? 'video/mp4'
          : fileType === 'png'
            ? 'image/png'
            : 'image/jpg'
      const key = `${uuidv4()}`

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        ContentType: mime,
        ACL: 'public-read',
        Metadata: {
          originalname: 'Ruby.png',
          ContentType: fileType,
        },
      })

      const url = await getSignedUrl(this.client, command, {
        expiresIn: 3600,
      })

      return { url, key }
    } catch (error) {
      throw new InternalServerErrorException('Error generating presigned URL')
    }
  }

  async generatePresignedGetUrl({ key }: PresignedGetUrlDto): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName, // Nombre del bucket
        Key: key, // La clave del archivo en S3
      })

      const signedUrl = await getSignedUrl(this.client, command, {
        expiresIn: 3600, // URL válida por 1 hora
      })

      return signedUrl
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async delete(key: string): Promise<any> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })

      await this.client.send(command)

      return { message: 'File deleted successfully' }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  // async uploadSingleFile({
  //   file,
  //   isPublic = true,
  // }: {
  //   file: Express.Multer.File;
  //   isPublic: boolean;
  // }) {
  //   try {
  //     const key = `${uuidv4()}`;
  //     const command = new PutObjectCommand({
  //       Bucket: this.bucketName,
  //       Key: key,
  //       Body: file.buffer,
  //       ContentType: file.mimetype,
  //       ACL: isPublic ? 'public-read' : 'private',

  //       Metadata: {
  //         originalName: file.originalname,
  //       },
  //     });

  //     await this.client.send(command);

  //     return {
  //       url: isPublic
  //         ? (await this.getFileUrl(key)).url
  //         : (await this.getPresignedSignedUrl(key)).url,
  //       key,
  //       isPublic,
  //     };
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }

  // async getFileUrl(key: string) {
  //   return { url: `https://${this.bucketName}.s3.amazonaws.com/${key}` };
  // }

  // async getPresignedSignedUrl(key: string) {
  //   try {
  //     const command = new GetObjectCommand({
  //       Bucket: this.bucketName,
  //       Key: key,
  //     });

  //     const url = await getSignedUrl(this.client, command, {
  //       expiresIn: 60 * 60 * 24, // 24 hours
  //     });

  //     return { url };
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }

  // async deleteFile(key: string) {
  //   try {
  //     const command = new DeleteObjectCommand({
  //       Bucket: this.bucketName,
  //       Key: key,
  //     });

  //     await this.client.send(command);

  //     return { message: 'File deleted successfully' };
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }
}
