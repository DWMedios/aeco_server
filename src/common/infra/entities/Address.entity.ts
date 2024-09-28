import { Column, Entity, OneToMany } from 'typeorm';
import type { IAddress } from '../../domain/entities/IAddress';
import { Aeco } from './Aeco.entity';
import { Base } from './Base';

@Entity('addresses')
export class Address extends Base implements IAddress {
  @Column()
  postalCode: number;

  @Column()
  street: string;

  @Column()
  state: string;

  @Column('jsonb')
  coords: Record<string, any>;

  @Column('jsonb')
  geometry: Record<string, any>[];

  @OneToMany(() => Aeco, (aeco) => aeco.address)
  aecos: Aeco[];
}
