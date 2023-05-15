import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ver } from '../app.controller';
import { AchievementService } from './achievement.service';
import { JwtAuthGuard } from '../authentification/jwt.guard';
import { CreateAchievementDTO } from '../dto/create-achievement.dto';

@UseGuards(JwtAuthGuard)
@Controller(ver + 'achievement')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Get()
  async getAchievements(@Res() response) {
    const achievements = await this.achievementService.getAchievements();
    if (achievements == null) {
      return response
        .status(204)
        .json({ message_code: 'no achievements found' });
    }
    return response.status(200).json(achievements);
  }

  @Get('/id/:id')
  async getAchievementById(@Res() response, @Param('id') id) {
    const achievement = await this.achievementService.getAchievementById(id);
    if (achievement == null) {
      return response
        .status(204)
        .json({ message_code: 'achievement not found' });
    }
    return response.status(200).json(achievement);
  }

  @Post()
  async createAchievement(@Res() response, @Body() body: CreateAchievementDTO) {
    let ret;
    try {
      ret = await this.achievementService.createAchievement(body);
    } catch (e) {
      return response.status(400).json({ message_code: e.message() });
    }
    return response.status(201).json(ret);
  }

  @Delete('/id/:id')
  async removeAchievement(@Res() response, @Param('id') id) {
    const achievement = await this.achievementService.removeAchievement(id);
    if (achievement == null) {
      return response
        .status(400)
        .json({ message_code: 'achievement not found' });
    }
    return response.status(200).json(achievement);
  }

  //TODO: ajouter images
}
