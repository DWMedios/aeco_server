import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { FileTypeEnum } from '../enums/FileType.enum'

export class UploadUrlDto {
  @IsEnum(FileTypeEnum, {
    message: 'fileType must be either video/mp4, image/jpeg, or image/png',
  })
  @IsNotEmpty()
  fileType: FileTypeEnum

  @IsString()
  @IsNotEmpty()
  fileName: string

  @IsNumber()
  @IsOptional()
  companyId?: number
}
