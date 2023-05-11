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
    this.waifusService.createWaifu(waifu);
    return response.status(200).send('OK');
  }

  @Get()
  getAllWaifus(@Res({ passthrough: true }) response, @Headers() head) {
    return this.waifusService.allWaifus();
  }

  @Get('/id/:id')
  getWaifuById(
    @Res({ passthrough: true }) response,
    @Headers() head,
    @Param('id') id,
  ) {
    if (head['token'] != token) {
      return response.status(401).send('Unauthorized');
    }
    return this.waifusService.getWaifuById(id);
  }

  @Get('/search/:name')
  getWaifuByName(
    @Res({ passthrough: true }) response,
    @Headers() head,
    @Param('name') name,
  ) {
    if (head['token'] != token) {
      return response.status(401).send('Unauthorized');
    }
    return this.waifusService.getWaifuByName(name);
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
