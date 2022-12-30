import { Achievement } from "src/achievement/achievement.entity";
import { Squads } from "src/squads/squads.entity";
import { Title } from "src/title/title.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

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

	@ManyToOne(type => Squads, squad => squad.members, { })
	@JoinColumn({ name: "squadid" })
	squad: Squads;

	@ManyToMany(type => Achievement, { eager: true, cascade: true})
	@JoinTable({
		name: "members_achievements",
		joinColumn: {
		 name: "member",
		 referencedColumnName: "id"
		},
		inverseJoinColumn: {
		 name: "achievement",
		 referencedColumnName: "id"
		 }})
	achievements: Achievement[];

	@Column({nullable : true, default: false})
	title : string;

	@OneToMany(type => Title, title => title.member, { eager: true, cascade: true})
	@JoinColumn({ name: "id" })
	titles: Title[];
}