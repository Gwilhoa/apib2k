import {
  Controller,
  Post,
  Res,
  Headers,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { WaifusService } from './waifus.service';
import { ver, token } from '../app.controller';

@Controller(ver + 'waifus')
export class WaifusController {
  constructor(private readonly waifusService: WaifusService) {}

  @Post()
  createWaifu(@Res() response, @Body() body) {
    let waifu;
    try {
      waifu = this.waifusService.createWaifu(body);
    } catch (e) {
      return response.status(400).json({ message_code: e.message() });
    }
    return response.status(200).send(waifu);
  }

  @Get()
  getWaifus(@Res() response) {
    return response.status(200).json(this.waifusService.getWaifus());
  }

  @Get('/id/:id')
  getWaifuById(@Res() response, @Param('id') id) {
    const waifu = this.waifusService.getWaifuById(id);
    if (waifu == null) {
      return response.status(204).json({ message_code: 'waifu not found' });
    }
    return response.status(200).json(waifu);
  }

  @Get('/search/:name')
  getWaifuByName(@Res() response, @Param('name') name) {
    return response.status(200).json(this.waifusService.getWaifuByName(name));
  }
  @Get('reset')
  resetWaifus(@Res({ passthrough: true }) response, @Headers() head) {
    if (head['token'] != token) {
      return response.status(401).send('Unauthorized');
    }
    this.waifusService.resetWaifus();
    return response.status(200).send('OK');
  }
}
