import { registerAs } from '@nestjs/config'

export default registerAs('s3', () => ({
  region: process.env.S3_REGION,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  bucketName: process.env.S3_BUCKET_NAME,
  expiration: Number(process.env.EXPIRATION),
}))
