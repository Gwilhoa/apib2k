import { Members } from 'src/members/members.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Squads {
  @PrimaryColumn({ nullable: false, length: 36 })
  id: string;

  @Column({ nullable: false, length: 100 })
  name: string;

  @Column({ nullable: false, default: 0 })
  PointsGiven: number;

  @Column({ nullable: false, default: 0, type: 'bigint' })
  PointsTotal: number;

  @Column({ nullable: false, length: 36 })
  color: string;

  @OneToMany((type) => Members, (member) => member.squad)
  @JoinColumn({ name: 'squadid' })
  members: Members[];
}
