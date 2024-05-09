import { Entity, Column, OneToMany } from 'typeorm';
import { Aeco } from './Aeco.entity';
import { Base } from './Base';
import type { IAddress } from '../../domain/entities/IAddress';

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

  @Column('jsonb', { array: true })
  geometry: Record<string, any>[];

  @OneToMany(() => Aeco, (aeco) => aeco.address)
  aecos: Aeco[];
}
