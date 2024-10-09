import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IBaseS3, IUploadUrl } from '@shared/domain/S3Type'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class S3Service {
  private client: S3Client
  private bucketName: string

  constructor(private readonly configService: ConfigService) {
    const s3Region = this.configService.get<string>('S3_REGION')
    const accessKeyId = this.configService.get<string>('S3_ACCESS_KEY')
    const secretAccessKey = this.configService.get<string>(
      'S3_SECRET_ACCESS_KEY',
    )
    this.bucketName = this.configService.get<string>('S3_BUCKET_NAME')

    if (!s3Region || !accessKeyId || !secretAccessKey || !this.bucketName) {
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
  }: IUploadUrl): Promise<{ url: string; key: string }> {
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
        Key: key,
        ContentType: mimeType,
        ACL: 'public-read',
        Metadata: {
          fileName,
        },
      })

      const url = await getSignedUrl(this.client, command, { expiresIn: 3600 })
      return { url, key }
    } catch (error) {
      throw new InternalServerErrorException(
        'Error generating presigned upload URL',
      )
    }
  }

  async generatePresignedGetUrl({ key }: IBaseS3): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })

      return await getSignedUrl(this.client, command, { expiresIn: 3600 })
    } catch (error) {
      throw new InternalServerErrorException(
        'Error generating presigned get URL',
      )
    }
  }

  async deleteFile(key: string): Promise<{ message: string }> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })

      await this.client.send(command)
      return { message: 'File deleted successfully' }
    } catch (error) {
      throw new InternalServerErrorException('Error deleting file')
    }
  }
}
