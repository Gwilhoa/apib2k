import { Controller } from '@nestjs/common';
import { token, ver } from '../app.controller';
import { GeneralService } from './general.service';
import { Body, Get, Headers, Param, Post, Res, Response } from '@nestjs/common';

@Controller(ver+'general')
export class GeneralController {
    constructor(private readonly generalService: GeneralService) {
    }

    @Post('season')
    updateSeason(@Res({ passthrough: true }) response, @Headers() head, @Body() body) {
        if (head['token'] != token) {
            return response.status(401).send('Unauthorized');
        }
        this.generalService.updateSeason(body);
    }

    @Get('season')
    getSeason(@Res({passthrough: true}) response, @Headers() head) {
        if (head['token'] != token) {
            return response.status(401).send('Unauthorized');
        }
        return this.generalService.getSeason();
    }

}
