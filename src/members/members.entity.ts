import { Achievement } from 'src/achievement/achievement.entity';
import { Squads } from 'src/squads/squads.entity';
import { Title } from 'src/title/title.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { waifusMembers } from '../waifus-members/waifus-members.entity';
import { MyItem } from '../item/myitem.entity';
import { Role } from '../role/role.entity';

@Entity()
export class Members {
  @PrimaryColumn({ nullable: false, length: 36 })
  id: string;

  @Column({ nullable: true, length: 100 })
  avatar: string;

  @Column({ nullable: false, length: 100 })
  name: string;

  @Column({ nullable: false, default: 0, type: 'int' })
  points: number;

  @Column({ nullable: false, default: 0 })
  coins: number;

  @ManyToOne((type) => Squads, (squad) => squad.members)
  @JoinColumn({ name: 'squadid' })
  squad: Squads;

  @ManyToMany((type) => Achievement)
  @JoinTable({
    name: 'members_achievements',
    joinColumn: {
      name: 'member',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'achievement',
      referencedColumnName: 'id',
    },
  })
  achievements: Achievement[];

  @Column({ nullable: true, default: false })
  title: string;

  @OneToMany((type) => Title, (title) => title.member, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'id' })
  titles: Title[];

  @Column({ nullable: false, default: 0 })
  memevotes: number;

  @Column({ nullable: false, default: 0 })
  bestmeme: number;

  @OneToMany((type) => waifusMembers, (waifusMembers) => waifusMembers.member, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'id' })
  waifus: waifusMembers[];

  @Column({ nullable: false, default: 0, type: 'bigint' })
  waifutime: number;

  @Column({ nullable: false, default: 0 })
  canUseApi: boolean;

  @Column({ nullable: true })
  password: string;

  @OneToMany(() => MyItem, (myItem) => myItem.member)
  @JoinColumn({ name: 'id', referencedColumnName: 'member_id' })
  items: MyItem[];

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'members_roles',
    joinColumn: {
      name: 'member',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];
}
