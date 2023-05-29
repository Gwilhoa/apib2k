import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ver } from '../app.controller';
import { GeneralService } from './general.service';
import { JwtAuthGuard } from '../authentification/jwt.guard';

@Controller(ver + 'general')
export class GeneralController {
  constructor(private readonly generalService: GeneralService) {}

  @Post('season')
  @UseGuards(JwtAuthGuard)
  updateSeason(@Res() response, @Body() body) {
    if (body.name == null) {
      return response.status(400).json({ message_code: 'Name is Null' });
    }
    const season = this.generalService.updateSeason(body.name);
    if (season == null) {
      return response.status(400).json({ message_code: 'Bad Request' });
    }
    return response.status(200).send('success');
  }

  @Get('season')
  async getSeason(@Res() response) {
    return response.status(200).json(await this.generalService.getSeason());
  }
}
