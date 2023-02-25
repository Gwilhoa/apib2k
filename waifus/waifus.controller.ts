import {Controller, Post, Res, Headers, Body , Get, Param} from '@nestjs/common';
import { WaifusService } from './waifus.service';
import { ver, token } from '../app.controller';

@Controller(ver + 'waifus')
export class WaifusController {
	constructor(private readonly waifusService: WaifusService) {
	}

	@Post()
	createWaifu(@Res({ passthrough: true }) response, @Headers() head, @Body() body) {
		if (head['token'] != token) {
			return response.status(401).send('Unauthorized');
		}
		this.waifusService.createWaifu(body);
		return response.status(200).send('OK');
	}

	@Get()
	getAllWaifus(@Res({ passthrough: true }) response, @Headers() head) {
		if (head['token'] != token) {
			return response.status(401).send('Unauthorized');
		}
		return this.waifusService.allWaifus();
	}

	@Get('/id/:id')
	getWaifuById(@Res({ passthrough: true }) response, @Headers() head, @Param('id') id) {
		if (head['token'] != token) {
			return response.status(401).send('Unauthorized');
		}
		return this.waifusService.getWaifuById(id);
	}

	@Get("reset")
	resetWaifus(@Res({ passthrough: true }) response, @Headers() head) {
		if (head['token'] != token) {
			return response.status(401).send('Unauthorized');
		}
		this.waifusService.resetWaifus();
		return response.status(200).send('OK');
	}
}
