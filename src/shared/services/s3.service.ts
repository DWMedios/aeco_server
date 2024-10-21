import { v4 as uuidv4 } from 'uuid'
import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type {
  IBaseS3,
  IResponseMessage,
  IResponseUploadUrl,
  IUploadUrl,
} from '@shared/domain/S3Type'
import type { IS3Service } from '@shared/domain/services/IS3Service'

@Injectable()
export class S3Service implements IS3Service {
  private client: S3Client
  private bucketName: string
  private expiration: number

  constructor(private readonly configService: ConfigService) {
    const s3Region = this.configService.get<string>('s3.region')
    const accessKeyId = this.configService.get<string>('s3.accessKeyId')
    const secretAccessKey = this.configService.get<string>('s3.secretAccessKey')
    this.bucketName = this.configService.get<string>('s3.bucketName')
    this.expiration = this.configService.get<number>('s3.expiration')

    if (
      !s3Region ||
      !accessKeyId ||
      !secretAccessKey ||
      !this.bucketName ||
      !this.expiration
    ) {
      throw new Error('Missing S3 configuration in environment variables')
    }

    this.client = new S3Client({
      region: s3Region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    })
  }

  async generatePresignedUploadUrl({
    fileType,
    fileName,
  }: IUploadUrl): Promise<IResponseUploadUrl> {
    try {
      const mimeType =
        fileType === 'mp4'
          ? 'video/mp4'
          : fileType === 'png'
            ? 'image/png'
            : 'image/jpg'

      const key = `${uuidv4()}`

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: `${key}`,
        ContentType: mimeType,
        ACL: 'public-read',
        Metadata: {
          fileName,
        },
      })

      const url = await getSignedUrl(this.client, command, {
        expiresIn: this.expiration,
      })
      return { url, key }
    } catch (error) {
      throw new InternalServerErrorException(
        'Error generating presigned upload URL',
      )
    }
  }

  async getPresignedViewUrl({ key }: IBaseS3): Promise<any> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })

      return await getSignedUrl(this.client, command, {
        expiresIn: this.expiration,
      })
    } catch (error) {
      throw new InternalServerErrorException(
        'Error generating presigned get URL',
      )
    }
  }

  async deleteFile({ key }: IBaseS3): Promise<IResponseMessage> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })

      await this.client.send(command)
      return { status: 200, message: 'File deleted successfully' }
    } catch (error) {
      throw new InternalServerErrorException('Error deleting file')
    }
  }

  async fileExist({ key }: IBaseS3): Promise<IResponseMessage> {
    try {
      const headCommand = new HeadObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })
      await this.client.send(headCommand)
      return { status: 200, message: 'File exists' }
    } catch (error) {
      if (error.name === 'NotFound') {
        return { status: 404, message: `File with key ${key} not found` }
      }
      throw new InternalServerErrorException(
        `Error checking file with key ${key}`,
      )
    }
  }
}
