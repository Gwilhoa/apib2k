import { Entity, ManyToOne } from "typeorm";
import { Column, PrimaryGeneratedColumn } from "typeorm";
import { waifusMembers } from "../waifus-members/waifus-members.entity";

@Entity()
export class Waifu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({length: 2000})
  description: string;

  @Column()
  origin: string;

  @Column()
  rare: number;

  @Column()
  epic: number;

  @Column()
  legendary: number;

}