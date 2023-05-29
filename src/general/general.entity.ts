import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class General {
  @PrimaryColumn()
  key: string;

  @Column()
  value: string;
}
