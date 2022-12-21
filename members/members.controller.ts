import { Controller } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMembersDTO } from '../dto/create-members.dto';
import { MembersDTO } from '../dto/members.dto';
import { Members } from './members.entity';
import { Body, Get, Headers, Param, Post, Res, Response } from '@nestjs/common';
import { secrettoken, ver } from '../app.controller';

@Controller()
export class MembersController {
	  constructor(private readonly membersService: MembersService) {}
	
	@Get(ver+'members')
	getMembers(@Res({ passthrough: true }) response, @Headers() head) {
		if (head['token'] != secrettoken) {
			return response.status(401).send('Unauthorized');
		}
		return this.membersService.allMembers();
	}

	@Post(ver+'members')
	public async createMember(@Body() createMemberRequest: CreateMembersDTO,  @Res({ passthrough: true }) response, @Headers() head) {
		if (head['token'] != secrettoken) {
			return response.status(401).send('Unauthorized');
		}
		const member = await this.membersService.createMember(createMemberRequest);
		response.status(200)
		return member;
	}

	@Get(ver+'members/id/:id')
	getMemberById(@Res({ passthrough: true }) response, @Headers() head, @Param() id) {
		if (head['token'] != secrettoken) {
			return response.status(401).send('Unauthorized');
		}
		response.status(200);
		return this.membersService.getMemberById(id);
	}

	@Get(ver+'members/remove/:id')
	removeMember(@Res({ passthrough: true }) response, @Headers() head, @Param() id) {
		if (head['token'] != secrettoken) {
			return response.status(401).send('Unauthorized');
		}
		return this.membersService.removeMember(id);
	}

	@Post(ver+'members/coins/:id')
	addCoins(@Res({ passthrough: true }) response, @Headers() head, @Param() id, @Body() body) {
		if (head['token'] != secrettoken) {
			return response.status(401).send('Unauthorized');
		}
		return this.membersService.addCoins(id, body['coins']);
	}

	@Post(ver+'members/points/:id')
	addPoints(@Res({ passthrough: true }) response, @Headers() head, @Param() id, @Body() body) {
		if (head['token'] != secrettoken) {
			return response.status(401).send('Unauthorized');
		}
		if (!this.membersService.addPoints(id, body['points']))
			return response.status(400).send('Bad Request');
		return response.status(200).send('OK')
	}

	@Post(ver+'members/squads/:id')
	addSquad(@Res({ passthrough: true }) response, @Headers() head, @Body() body, @Param() id) {
		if (head['token'] != secrettoken) {
			return response.status(401).send('Unauthorized');
		}
		return this.membersService.addSquad(body['squadid'], id);
	}

	@Get(ver+'squads/members/:id')
	getSquadMembers(@Res({ passthrough: true }) response, @Headers() head, @Param() id) {
		if (head['token'] != secrettoken) {
			return response.status(401).send('Unauthorized');
		}
		return this.membersService.getSquadMembers(id);
	}

	@Get(ver+'members/achievements/:id')
	getMemberAchievements(@Res({ passthrough: true }) response, @Headers() head, @Param() id) {
		if (head['token'] != secrettoken) {
			return response.status(401).send('Unauthorized');
		}
		return this.membersService.getAchievements(id);
	}

	@Post(ver+'members/achievements/:id')
	addAchievement(@Res({ passthrough: true }) response, @Headers() head, @Param() id, @Body() body) {
		if (head['token'] != secrettoken) {
			return response.status(401).send('Unauthorized');
		}
		try {
			this.membersService.addAchievement(id, body['achievement'])
		}
		catch (e) {
			response.status(400).send('Bad Request');
			return;
		}
		response.status(200).send('OK');
		return;
	}

	@Post(ver+'members/achievements/revoke/:id')
	revokeAchievement(@Res({ passthrough: true }) response, @Headers() head, @Param() id, @Body() body) {
		if (head['token'] != secrettoken) {
			response.status(401).send('Unauthorized');
			return;
		}
		this.membersService.revokeAchievement(id, body['achievement']);
		response.status(200).send('OK');
		return;
	}

	@Post(ver+'members/title/add/:id')
	addTitle(@Res({ passthrough: true }) response, @Headers() head, @Param() id, @Body() body) {
		if (head['token'] != secrettoken) {
			response.status(401).send('Unauthorized');
			return;
		}
		this.membersService.addTitle(id, body['title']);
		response.status(200).send('OK');
		return;
	}

	@Get(ver+'members/title/get/:id')
	getTitle(@Res({ passthrough: true }) response, @Headers() head, @Param() id) {
		if (head['token'] != secrettoken) {
			response.status(401).send('Unauthorized');
			return;
		}
		return this.membersService.getTitles(id);
	}

	@Post(ver+'members/title/remove/:id')
	removeTitle(@Res({ passthrough: true }) response, @Headers() head, @Param() id, @Body() body) {
		if (head['token'] != secrettoken) {
			response.status(401).send('Unauthorized');
			return;
		}
		this.membersService.revokeTitle(id, body['title']);
		response.status(200).send('OK');
		return;
	}

	@Post(ver+'members/title/set/:id')
	setTitle(@Res({ passthrough: true }) response, @Headers() head, @Param() id, @Body() body) {
		if (head['token'] != secrettoken) {
			response.status(401).send('Unauthorized');
			return;
		}
		this.membersService.setTitle(id, body['title']);
		response.status(200).send('OK');
		return;
	}

}
