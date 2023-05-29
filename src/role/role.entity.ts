import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { RoleCategorie } from './rolecategory.entity';
import { Members } from '../members/members.entity';

@Entity()
export class Role {
  @PrimaryColumn({ nullable: false, length: 36 })
  id: string;

  @Column({ nullable: false, length: 100 })
  name: string;

  @ManyToOne(() => RoleCategorie, (role) => role.children)
  parent: RoleCategorie;

  @ManyToMany(() => Members, (member) => member.roles)
  @JoinTable({
    name: 'members_roles',
    joinColumn: {
      name: 'role',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'member',
      referencedColumnName: 'id',
    },
  })
  members: Members[];
}
