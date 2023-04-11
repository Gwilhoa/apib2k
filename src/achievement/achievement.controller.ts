import { Body, Controller, Get, Headers, Param, Post, Res } from '@nestjs/common';
import { ver, token } from '../app.controller';
import { AchievementService } from './achievement.service';

@Controller (ver +'achievement')
export class AchievementController {
	constructor(private readonly achievementService: AchievementService) {}

	@Get()
	getAll(@Res({ passthrough: true }) response, @Headers() head) {
		if (head['token'] != token) {
			return response.status(401).send('Unauthorized');
		}
		return this.achievementService.getAll();
	}

	@Get('/id/:id')
	getAchievementById(@Res({ passthrough: true }) response, @Headers() head, @Param() id) {
		if (head['token'] != token) {
			return response.status(401).send('Unauthorized');
		}
		return this.achievementService.getAchievementById(id);
	}

	@Post()
	createAchievement(@Res({ passthrough: true }) response, @Headers() head, @Body() body) {
		if (head['token'] != token) {
			return response.status(401).send('Unauthorized');
		}
		return this.achievementService.createAchievement(body);
	}

	@Get('/remove/:id')
	removeAchievement(@Res({ passthrough: true }) response, @Headers() head, @Param() id) {
		if (head['token'] != token) {
			return response.status(401).send('Unauthorized');
		}
		return this.achievementService.removeAchievement(id);
	}
}
