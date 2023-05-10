import { randomUUID } from 'crypto';
import { Entity, ManyToOne, OneToMany, OneToOne, Column } from 'typeorm';
import { Waifu } from '../waifus/waifus.entity';
import { Members } from '../members/members.entity';
import { JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import type { Relation } from 'typeorm';

@Entity()
export class waifusMembers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => Waifu, (waifu) => waifu.id, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'waifuid' })
  waifu: Waifu;

  @ManyToOne((type) => Members, (member) => member.id)
  member: string;

  @Column({ nullable: false, default: 0 })
  level: number;

  @Column({ nullable: false, default: 0 })
  exp: number;

  @Column({ nullable: false, default: 0 })
  rarety: number;
}
