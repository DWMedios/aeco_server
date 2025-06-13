import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { isUUID } from 'class-validator'

@Injectable()
export class CustomParseUUIDPipe implements PipeTransform {
  constructor(private readonly version: '3' | '4' | '5' = '4') {}

  async transform(value: any): Promise<string> {
    if (!isUUID(value, this.version)) {
      throw new BadRequestException('Validation failed (uuid 4 expected)')
    }

    return value
  }
}
