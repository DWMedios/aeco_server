import { Entity, Column, ManyToMany, OneToMany } from 'typeorm';
import { Base } from './Base';
import { Company } from './Company.entity';
import { UserCompanyPermissions } from './Permission.entity';

@Entity({ name: 'users' })
export class User extends Base {
  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 100 })
  position: string;

  @Column({ nullable: true })
  photoUrl: string;

  @Column({ length: 10 })
  gender: string;

  @Column()
  password: string;

  @ManyToMany(() => Company, (company) => company.users)
  companies: Company[];

  @OneToMany(
    () => UserCompanyPermissions,
    (userCompanyPermissions) => userCompanyPermissions.user,
  )
  userCompanyPermissions: UserCompanyPermissions[];
}
