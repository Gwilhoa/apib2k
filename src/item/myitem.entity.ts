import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Members } from '../members/members.entity';
import { Item } from './item.entity';

@Entity()
export class MyItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Item, (item) => item.id)
  item: Item;

  @Column({ nullable: false, default: 0 })
  quantity: number;

  @ManyToOne(() => Members, (member) => member.items)
  @JoinColumn({ name: 'member_id' }) // Remplacez 'member_id' par le nom de votre colonne de jointure
  member: Members;
}
