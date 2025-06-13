import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { ConfigService } from '@nestjs/config'
import { Injectable, Logger } from '@nestjs/common'
import type { IS3Service } from '@shared/domain/services/IS3Service'

@Injectable()
export class S3Service implements IS3Service {
  logger = new Logger(S3Service.name)
  private bucketName: string
  private expiration: number

  constructor(
    private readonly s3Client: S3Client,
    private readonly configService: ConfigService,
  ) {
    this.bucketName = this.configService.get<string>('s3.bucketName')
    this.expiration = this.configService.get<number>('s3.expiration')
  }

  async getPresignedUploadUrl(
    key: string,
    fileType: string,
    fileName: string,
    metadata: Record<string, string>,
  ): Promise<{
    url: string
    headers: Record<string, string>
  } | null> {
    try {
      const contentDisposition = `attachment; filename=${encodeURIComponent(fileName)}`

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        ContentType: fileType,
        ACL: 'public-read',
        Metadata: metadata,
        ContentDisposition: contentDisposition,
      })

      const url = await getSignedUrl(this.s3Client, command, {
        expiresIn: this.expiration,
      })
      return {
        url,
        headers: {
          'Content-Type': fileType,
          'Content-Disposition': contentDisposition,
        },
      }
    } catch (error) {
      this.logger.error('Error generating presigned upload URL', error)
      return null
    }
  }

  async getPresignedUrl(key: string): Promise<string | null> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })

      return await getSignedUrl(this.s3Client, command, {
        expiresIn: this.expiration,
      })
    } catch (error) {
      this.logger.error('Error generating presigned URL', error)
      return null
    }
  }

  async deleteFile(key: string): Promise<boolean> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })

      await this.s3Client.send(command)
      return true
    } catch (error) {
      this.logger.error('Error deleting file', error)
      return false
    }
  }

  async fileExist(key: string): Promise<boolean> {
    try {
      const headCommand = new HeadObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })
      await this.s3Client.send(headCommand)
      return true
    } catch (error) {
      this.logger.error('Error checking file existence', error)
      return false
    }
  }

  async getFileUrlIfExists(key: string): Promise<string | null> {
    const fileExists = await this.fileExist(key)
    if (!fileExists) return null
    return await this.getPresignedUrl(key)
  }
}
