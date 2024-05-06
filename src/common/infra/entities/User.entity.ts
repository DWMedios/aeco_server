import * as bcrypt from 'bcrypt';
import { Entity, Column, ManyToMany, OneToMany, BeforeInsert } from 'typeorm';
import { Base } from './Base';
import { Company } from './Company.entity';
import { UserCompanyPermissions } from './Permission.entity';
import type { IUser } from '../../domain/entities/IUser';

@Entity({ name: 'users' })
export class User extends Base implements IUser {
  @Column({ nullable: false, length: 100 })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: true, length: 20 })
  phone?: string;

  @Column({ nullable: true, length: 50 })
  position?: string;

  @Column({ nullable: true })
  photoUrl?: string;

  @Column({ nullable: true, length: 20 })
  gender?: string;

  @Column()
  password: string;

  @ManyToMany(() => Company, (company) => company.users)
  companies: Company[];

  @OneToMany(
    () => UserCompanyPermissions,
    (userCompanyPermissions) => userCompanyPermissions.user,
  )
  userCompanyPermissions: UserCompanyPermissions[];

  @BeforeInsert()
  async hashPasword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
