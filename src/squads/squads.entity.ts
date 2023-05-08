import { Members } from 'src/members/members.entity';
import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class Squads {
  @PrimaryColumn({ nullable: false, length: 36 })
  id: string;

  @Column({ nullable: false, length: 100 })
  name: string;

  @Column({ nullable: false, default: 0 })
  PointsGiven: number;

  @Column({ nullable: false, default: 0 })
  PointsTotal: number;

  @Column({ nullable: false, length: 36 })
  color: string;

  @OneToMany((type) => Members, (member) => member.squad, {
    eager: true,
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'squadid' })
  members: Members[];
}
