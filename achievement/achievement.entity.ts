import { Members } from "src/members/members.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Achievement {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;
	
	@Column({nullable : false, default: 0})
	coinsprice: number;

	@Column({nullable : false, default: 0})
	pointprice: number;

	@Column({nullable : true})
	titleprice: string;

	@ManyToMany(type => Members, members => members.achievements)
	@JoinTable({ name: "members_achievements", joinColumn: { name: "achievement", referencedColumnName: "id" }, inverseJoinColumn: { name: "member", referencedColumnName: "id" }})
	members: Members[];

}