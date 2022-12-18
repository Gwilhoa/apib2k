import { Squads } from "src/squads/squads.entity";

export class MembersDTO
{
	id: string;
	name: string;
	points: number;
	coins: number;
	squad: Squads;
}