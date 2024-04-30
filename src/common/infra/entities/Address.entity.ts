import { Entity, Column, OneToMany } from 'typeorm';
import { Aeco } from './Aeco.entity';
import { Base } from './Base';

@Entity('addresses')
export class Address extends Base {
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
