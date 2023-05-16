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

  @ManyToOne(() => Members, (member) => member.items) // Modifier MyItem en Members
  @JoinColumn({ name: 'memberId' }) // Modifier en fonction du nom réel de la colonne de clé étrangère
  member: Members;

  @Column({ nullable: false, default: 0 })
  quantity: number;
}
