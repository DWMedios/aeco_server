import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator'

export class PresignedUploadUrlDto {
  @IsString()
  @IsIn(['mp4', 'jpeg', 'png'], {
    message: 'fileType must be either mp4, jpeg, or png',
  })
  fileType: string

  @IsString()
  fileName: string

  @IsNumber()
  @IsOptional()
  companyId: number
}
