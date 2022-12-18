import { Squads } from "src/squads/squads.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Members {
	@PrimaryColumn({ nullable : false, length: 36 })
	id: string;

	@Column({ nullable : false, length: 100 })
	name: string;

	@Column( {nullable : false, default: 0} )
	points: number;

	@Column( {nullable : false, default: 0} )
	coins: number;

	@ManyToOne(type => Squads, squad => squad.members, { eager: true, cascade: true,})
	@JoinColumn({ name: "squadid" })
	squad: Squads;

}