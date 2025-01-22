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
import type { IUploadUrl } from '@shared/domain/S3Type'
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
    pathFile,
  }: IUploadUrl): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: pathFile,
        ContentType: fileType,
        ACL: 'public-read',
        Metadata: {
          fileName,
        },
      })

      const url = await getSignedUrl(this.client, command, {
        expiresIn: this.expiration,
      })
      return url
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(
        'Error generating presigned upload URL',
      )
    }
  }

  async getPresignedUrl(key: string): Promise<string> {
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

  async deleteFile(key: string): Promise<boolean> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })

      await this.client.send(command)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async fileExist(key: string): Promise<boolean> {
    try {
      const headCommand = new HeadObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })
      await this.client.send(headCommand)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async getFileUrlIfExists(key: string): Promise<string | null> {
    const fileExists = await this.fileExist(key)
    if (!fileExists) return null
    return await this.getPresignedUrl(key)
  }
}
