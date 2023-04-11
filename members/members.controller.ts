import { Controller } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMembersDTO } from '../dto/create-members.dto';
import { Body, Get, Headers, Param, Post, Res, Response } from '@nestjs/common';
import { sleep } from '../main';
import { ver, token } from '../app.controller';

@Controller(ver + 'members')
export class MembersController {
	  constructor(private readonly membersService: MembersService) {
		const thread = async () => {
			var date = new Date().getDay();
			while (true) {
				await sleep(60000);
				if (date != new Date().getDay()) {
					date = new Date().getDay();
					this.membersService.updateMembers();
				}				
			}
		}

		thread();
	  }
	
	  @Get('memevote/:id')
	  getMemeVote(@Res({ passthrough: true }) response, @Headers() head, @Param() id) {
		  if (head['token'] != token) {
			  return response.status(401).send('Unauthorized');
		  }
		  return this.membersService.getMemeVote(id);
	  }
  
	  @Post('memevote/:id')
	  addMemeVote(@Res({ passthrough: true }) response, @Headers() head, @Body() body, @Param() id) {
		  if (head['token'] != token) {
			  return response.status(401).send('Unauthorized');
		  }
		  return this.membersService.addMemeVote(id);
	  }

	@Get()
	getMembers(@Res({ passthrough: true }) response, @Headers() head) {
		if (head['token'] != token) {
			return response.status(401).send('Unauthorized');
		}
		return this.membersService.allMembers();
	}

	@Post()
	public async createMember(@Body() createMemberRequest: CreateMembersDTO,  @Res({ passthrough: true }) response, @Headers() head) {
		if (head['token'] != token) {
			return response.status(401).send('Unauthorized');
		}
		const member = await this.membersService.createMember(createMemberRequest);
		response.status(200)
		return member;
	}

	@Get('id/:id')
	getMemberById(@Res({ passthrough: true }) response, @Headers() head, @Param() id) {
		if (head['token'] != token) {
			return response.status(401).send('Unauthorized');
		}
		response.status(200);
		return this.membersService.getMemberById(id);
	}

	@Get('remove/:id')
	removeMember(@Res({ passthrough: true }) response, @Headers() head, @Param() id) {
		if (head['token'] != token) {
			return response.status(401).send('Unauthorized');
		}
		return this.membersService.removeMember(id);
	}

	@Post('/coins/:id')
	addCoins(@Res({ passthrough: true }) response, @Headers() head, @Param() id, @Body() body) {
		if (head['token'] != token) {
			return response.status(401).send('Unauthorized');
		}
		return this.membersService.addCoins(id, body['coins']);
	}

	@Post('/points/:id')
	addPoints(@Res({ passthrough: false }) response, @Headers() head, @Param() id, @Body() body) {
		if (head['token'] != token) {
			return response.status(401).send('Unauthorized');
		}
		var ret;
		ret = this.membersService.addPoints(id, body['points'])
		if (!ret)
			return response.status(400).send('Bad Request');
		return response.status(200).send(ret)
	}

	@Post('/squads/:id')
	addSquad(@Res({ passthrough: true }) response, @Headers() head, @Body() body, @Param() id) {
		if (head['token'] != token) {
			return response.status(401).send('Unauthorized');
		}
		return this.membersService.addSquad(body['squadid'], id);
	}

	@Get('achievements/:id')
	getMemberAchievements(@Res({ passthrough: true }) response, @Headers() head, @Param() id) {
		if (head['token'] != token) {
			return response.status(401).send('Unauthorized');
		}
		return this.membersService.getAchievements(id);
	}

	@Post('achievements/:id')
	addAchievement(@Res({ passthrough: true }) response, @Headers() head, @Param() id, @Body() body) {
		if (head['token'] != token) {
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

	@Post('achievements/revoke/:id')
	revokeAchievement(@Res({ passthrough: true }) response, @Headers() head, @Param() id, @Body() body) {
		if (head['token'] != token) {
			response.status(401).send('Unauthorized');
			return;
		}
		this.membersService.revokeAchievement(id, body['achievement']);
		response.status(200).send('OK');
		return;
	}

	@Post('title/add/:id')
	addTitle(@Res({ passthrough: true }) response, @Headers() head, @Param() id, @Body() body) {
		if (head['token'] != token) {
			response.status(401).send('Unauthorized');
			return;
		}
		this.membersService.addTitle(id, body['title']);
		response.status(200).send('OK');
		return;
	}

	@Get('title/get/:id')
	getTitle(@Res({ passthrough: true }) response, @Headers() head, @Param() id) {
		if (head['token'] != token) {
			response.status(401).send('Unauthorized');
			return;
		}
		return this.membersService.getTitles(id);
	}

	@Post('title/remove/:id')
	removeTitle(@Res({ passthrough: true }) response, @Headers() head, @Param() id, @Body() body) {
		if (head['token'] != token) {
			response.status(401).send('Unauthorized');
			return;
		}
		this.membersService.revokeTitle(id, body['title']);
		response.status(200).send('OK');
		return;
	}

	@Post('title/set/:id')
	setTitle(@Res({ passthrough: true }) response, @Headers() head, @Param() id, @Body() body) {
		if (head['token'] != token) {
			response.status(401).send('Unauthorized');
			return;
		}
		this.membersService.setTitle(id, body['title']);
		response.status(200).send('OK');
		return;
	}

	@Get('bestmeme/:id')
	getBestMeme(@Res({ passthrough: true }) response, @Headers() head, @Param() id) {
		if (head['token'] != token) {
			response.status(401).send('Unauthorized');
			return;
		}
		return this.membersService.getbestmeme(id);
	}

	@Post('bestmeme/:id')
	addBestMeme(@Res({ passthrough: true }) response, @Headers() head, @Param() id, @Body() body) {
		if (head['token'] != token) {
			response.status(401).send('Unauthorized');
			return;
		}
		this.membersService.addbestmeme(id);
		response.status(200).send('OK');
		return;
	}

	@Get('waifus/:id')
	getWaifus(@Res({ passthrough: true }) response, @Headers() head, @Param() id) {
		if (head['token'] != token) {
			response.status(401).send('Unauthorized');
			return;
		}
		return this.membersService.getWaifus(id);
	}

	@Get('catchwaifu/:id')
	catchWaifu(@Res({ passthrough: true }) response, @Headers() head, @Param() id, @Body() body) {
		if (head['token'] != token) {
			response.status(401).send('Unauthorized');
			return;
		}
			var ret = this.membersService.catchWaifu(id);
			if (ret == null) {
				response.status(400).send('Bad Request');
				return;
			}
			return ret;
	}

	@Post('modifyname/:id')
	modifyName(@Res({ passthrough: true }) response, @Headers() head, @Param() id, @Body() body) {
		if (head['token'] != token) {
			response.status(401).send('Unauthorized');
			return;
		}
		this.membersService.modifyName(id, body['name']);
		response.status(200).send('OK');
		return;
	}
}