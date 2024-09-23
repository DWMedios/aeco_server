import { IsNumber, IsString } from 'class-validator';

export class CreateRewardDto {
  @IsString()
  name: string;

  @IsString()
  metadata: string;

  @IsNumber()
  aecoId: number;
}
