import { Members } from 'src/members/members.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Achievement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: false, default: 0 })
  coins: number;

  @Column({ nullable: false, default: 0 })
  points: number;

  @Column({ nullable: true })
  title: string;

  @ManyToMany((type) => Members, (members) => members.achievements)
  @JoinTable({
    name: 'members_achievements',
    joinColumn: { name: 'achievement', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'member', referencedColumnName: 'id' },
  })
  members: Members[];

  @Column({ nullable: false, default: false })
  hidden: boolean;
}
