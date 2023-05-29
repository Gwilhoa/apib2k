import { Injectable } from '@nestjs/common';
import { Achievement } from './achievement.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAchievementDTO } from '../dto/create-achievement.dto';

@Injectable()
export class AchievementService {
  constructor(
    @InjectRepository(Achievement)
    private AchievementRepository: Repository<Achievement>,
  ) {}

  public async getAchievements() {
    return await this.AchievementRepository.find();
  }

  public async getAchievementById(id) {
    return await this.AchievementRepository.findOneBy({
      id: id,
    });
  }

  public async createAchievement(achievementDTO: CreateAchievementDTO) {
    if (achievementDTO.name == null) throw new Error('Name is null');
    if (achievementDTO.description == null)
      throw new Error('Description is null');
    if (achievementDTO.points == null) achievementDTO.points = 0;
    if (achievementDTO.coins == null) achievementDTO.coins = 0;
    if (achievementDTO.title == null) achievementDTO.title = null;
    const achievement: Achievement = new Achievement();
    achievement.name = achievementDTO.name;
    achievement.description = achievementDTO.description;
    achievement.points = achievementDTO.points;
    achievement.coins = achievementDTO.coins;
    achievement.title = achievementDTO.title;
    return await this.AchievementRepository.save(achievement);
  }

  public async removeAchievement(id) {
    const achievement = await this.AchievementRepository.findOneBy({
      id: id,
    });
    if (achievement == null) return null;
    return await this.AchievementRepository.remove(achievement);
  }
}
