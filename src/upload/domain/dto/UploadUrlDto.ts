import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export enum FileType {
  MP4 = 'mp4',
  JPEG = 'jpeg',
  PNG = 'png',
}

export class UploadUrlDto {
  @IsEnum(FileType, {
    message: 'fileType must be either mp4, jpeg, or png',
  })
  @IsNotEmpty()
  fileType: FileType

  @IsString()
  @IsNotEmpty()
  fileName: string

  @IsNumber()
  @IsOptional()
  companyId?: number
}
