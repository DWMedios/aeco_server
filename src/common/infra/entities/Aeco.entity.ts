import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './Base';
import { Ticket } from './Ticket.entity';
import { Company } from './Company.entity';
import { Address } from './Address.entity';

export enum AecoStatus {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
}

@Entity('aecos')
export class Aeco extends Base {
  @Column()
  name: string;

  @Column('enum', {
    enum: AecoStatus,
    default: AecoStatus.DISABLED,
    nullable: false,
  })
  status: AecoStatus;

  @Column({ default: false })
  isOnline: boolean;

  @Column('jsonb')
  currentCoords: Record<string, any>;

  @Column()
  companyId: number;

  @Column()
  addressId: number;

  @ManyToOne(() => Company, (company) => company.aecos)
  company: Company;

  @ManyToOne(() => Address, (address) => address.aecos)
  address: Address;

  @OneToMany(() => Ticket, (ticket) => ticket.aeco)
  tickets: Ticket[];
}
