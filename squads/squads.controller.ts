import { Body, Controller, Get, Headers, Param, Post, Res, Response } from '@nestjs/common';
import { setMaxIdleHTTPParsers } from 'http';
import { threadId } from 'worker_threads';
import { CreateSquadDTO } from '../dto/create-squads.dto';
import { SquadsService } from './squads.service';
import { sleep, token, ver } from '../main';


@Controller( ver +'squads')
export class SquadsController {
	constructor(private readonly squadService: SquadsService) {
		const thread = async () => {
			while (true) {
				await sleep(1000);
				this.squadService.updateSquads();
			}
		}

		thread();

	}

	@Post()
	public async createSquad(@Body() createSquadRequest: CreateSquadDTO,  @Res({ passthrough: true }) response, @Headers() head) {
		if (head['token'] != token) {
			return response.status(401).send('Unauthorized');
		}
		const squad = await this.squadService.createSquad(createSquadRequest);
		response.status(200)
		return squad;
	}

	@Get()
	getSquads(@Res({ passthrough: true }) response, @Headers() head) {
		if (head['token'] != token) {
			return response.status(401).send('Unauthorized');
		}
		return this.squadService.allSquads();
	}

	@Get('id/:id')
	getSquadById(@Res({ passthrough: true }) response, @Headers() head, @Param() id) {
		if (head['token'] != token) {
			return response.status(401).send('Unauthorized');
		}
		response.status(200);
		return this.squadService.getSquadById(id);
	}

	@Post('id/:id')
	addManualPoints(@Res({ passthrough: true }) response, @Headers() head, @Param() id, @Body() body) {
		if (head['token'] != token) {
			return response.status(401).send('Unauthorized');
		}
		response.status(200);
		return this.squadService.addManualPoints(id, body.points);
	}

	@Get('remove/:id')
	removeSquad(@Res({ passthrough: true }) response, @Headers() head, @Param() id) {
		if (head['token'] != token) {
			return response.status(401).send('Unauthorized');
		}
		return this.squadService.removeSquad(id);
	}

	@Get('member/:id')
	getSquadMembers(@Res({ passthrough: true }) response, @Headers() head, @Param() id) {
		if (head['token'] != token) {
			return response.status(401).send('Unauthorized');
		}
		return this.squadService.getSquadByMember(id['id']);
	}

	@Get('members/:id')
	getMembers(@Res({ passthrough: true }) response, @Headers() head, @Param() id) {
		if (head['token'] != token) {
			return response.status(401).send('Unauthorized');
		}
		return this.squadService.getMembersBySquad(id);
	}
}
