import { Members } from 'src/members/members.entity';
import {
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Title {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn()
  name: string;

  @ManyToOne((type) => Members, (member) => member.titles)
  member: Members;
}
