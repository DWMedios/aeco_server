import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator'

export class UploadUrlDto {
  @IsString()
  @IsIn(['mp4', 'jpeg', 'png'], {
    message: 'fileType must be either mp4, jpeg, or png',
  })
  fileType: string

  @IsNumber()
  @IsOptional()
  companyId: number
}
