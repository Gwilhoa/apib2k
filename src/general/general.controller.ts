import { Controller, UseGuards } from '@nestjs/common';
import { token, ver } from '../app.controller';
import { GeneralService } from './general.service';
import { Body, Get, Headers, Param, Post, Res, Response } from '@nestjs/common';
import { JwtAuthGuard } from '../authentification/jwt.guard';
@UseGuards(JwtAuthGuard)
@Controller(ver + 'general')
export class GeneralController {
  constructor(private readonly generalService: GeneralService) {}

  @Post('season')
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
  getSeason(@Res() response) {
    return response.status(200).json(this.generalService.getSeason());
  }
}
