import { Members } from "src/members/members.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Achievement {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;
	
	@Column({nullable : true})
	coinsprice: number;

	@Column({nullable : true})
	pointprice: number;

	@Column({nullable : true})
	titleprice: string

	@ManyToMany(type => Members, members => members.achievements)
	members: Members[];

}