import { Members } from 'src/members/members.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Title {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne((type) => Members, (member) => member.titles)
  @JoinColumn({ name: 'memberid' })
  member: Members;
}
