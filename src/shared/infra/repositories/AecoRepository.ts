import type { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Aeco } from '@infra-entities'
import type { IAeco } from '@domain-entities'

export class AecoRepository {
  constructor(
    @InjectRepository(Aeco)
    private readonly repository: Repository<IAeco>,
  ) {}
}
