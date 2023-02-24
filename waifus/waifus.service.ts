import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Waifu } from './waifus.entity';
import { CreateWaifuDTO } from '../dto/create-waifus.dto';


@Injectable()
export class WaifusService {
	constructor (@InjectRepository(Waifu) private waifuRepository: Repository<Waifu>) {}

	public async createWaifu(createWaifuRequest: CreateWaifuDTO) {
		const waifu: Waifu = new Waifu();
		waifu.name = createWaifuRequest?.name;
		waifu.description = createWaifuRequest?.description;
		waifu.origin = createWaifuRequest?.origin;
		waifu.rare = 0;
		waifu.epic = 0;
		waifu.legendary = 0;
		await this.waifuRepository.save(waifu);
		return waifu;
	}

	public async allWaifus() {
		const waifus = await this.waifuRepository.find();
		return waifus;
	}

	public async getWaifuById(id: number) {
		const waifu = await this.waifuRepository.findOneBy({
			id: id
		});
		return waifu;
	}

	public async resetWaifus() {
		const waifus = await this.waifuRepository.find();
		for (const waifu of waifus) {
			waifu.rare = 0;
			waifu.epic = 0;
			waifu.legendary = 0;
			await this.waifuRepository.save(waifu);
		}
		return waifus;
	}
}
