import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSquadDTO } from '../dto/create-squads.dto';
import { SquadsDTO } from '../dto/squads.dto';
import { Squads } from './squads.entity';

@Injectable()
export class SquadsService {
	constructor(@InjectRepository(Squads) private squadsRepository: Repository<Squads>) {
	}

	public async createSquad(createSquadRequest: CreateSquadDTO) {

		const squad: Squads = new Squads();
		squad.id = createSquadRequest?.id;
		squad.name = createSquadRequest?.name;
		squad.PointsGiven = 0;
		squad.PointsTotal = 0;
		squad.color = createSquadRequest?.color;
		await this.squadsRepository.save(squad);

		const squadDTO: SquadsDTO = new SquadsDTO();
		squadDTO.id = squad.id;
		squadDTO.name = squad.name;
		squadDTO.PointsGiven = squad.PointsGiven;
		squadDTO.PointsTotal = squad.PointsTotal;
		squadDTO.color = squad.color;

		return squadDTO;
	}

	public async allSquads() {
		const squads = await this.squadsRepository.find();
		return squads;
	}

	public async getSquadById(ids){
		return await this.squadsRepository.findOneBy({
			id: ids.id
		});
	}

	public async addManualPoints(ids, body){
		const squad = await this.squadsRepository.findOneBy({
			id: ids.id
		});
		if (!squad) {
			return null;
		}
		body = parseInt(body);
		squad.PointsGiven += body;
		squad.PointsTotal += body;
		await this.squadsRepository.save(squad);
		return squad;
	}

	public async removeSquad(ids){
		const squad = await this.squadsRepository.findOneBy({
			id: ids.id
		});
		if (squad)
			await this.squadsRepository.remove(squad);
		return squad;
	}

	public async getSquadMembers(ids) {
		const squad = await this.squadsRepository.findOneBy({
			id: ids.id
		});
		squad.members;
	}
}
