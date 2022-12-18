import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Achievement {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	imgurl: string;
	
	@Column({nullable : true})
	coinsprice: number;

	@Column({nullable : true})
	pointprice: number;

	@Column({nullable : true})
	titleprice: string

}