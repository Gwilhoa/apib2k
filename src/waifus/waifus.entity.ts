import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Waifu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ length: 2000 })
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
