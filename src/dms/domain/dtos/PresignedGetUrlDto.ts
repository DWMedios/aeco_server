import { IsString } from 'class-validator';

export class PresignedGetUrlDto {
  @IsString()
  key: string;
}
