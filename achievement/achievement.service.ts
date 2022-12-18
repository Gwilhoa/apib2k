import { Injectable } from '@nestjs/common';
import { Achievement } from './achievement.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAchievementDTO } from '../dto/create-achievement.dto';

@Injectable()
export class AchievementService {
	constructor(@InjectRepository(Achievement) private AchievementRepository: Repository<Achievement>) {}
	public async getAll() {
		return await this.AchievementRepository.find();
	}

	public async getAchievementById(ids){
		return await this.AchievementRepository.findOneBy({
			id: ids.id
		});
	}

	public async createAchievement(createAchievementRequest: CreateAchievementDTO) {
		const achievement: Achievement = new Achievement();
		achievement.name = createAchievementRequest.name;
		achievement.description = createAchievementRequest.description;
		achievement.pointprice = createAchievementRequest.points;
		achievement.coinsprice = createAchievementRequest.coins;
		achievement.titleprice = createAchievementRequest.title;
		achievement.imgurl = createAchievementRequest.imgurl;
		await this.AchievementRepository.save(achievement);

		return ;
	}
}
