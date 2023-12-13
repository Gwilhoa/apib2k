import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateSquadDTO } from '../dto/create-squads.dto';
import { SquadsService } from './squads.service';
import { ver } from '../app.controller';
import { JwtAuthGuard } from '../authentification/jwt.guard';
import { User } from '../authentification/auth.decorator';

@Controller(ver + 'squads')
export class SquadsController {
  private logger = new Logger('SquadsController');

  constructor(private readonly squadService: SquadsService) {
    this.squadService.updateSquad();
    this.logger.log('Squad updated');
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  public async deleteSquad(@Body() body, @Res() response) {
    const squad = await this.squadService.removeSquad(body.id);
    if (squad == null) {
      return response.status(400).send('Squad not found');
    }
    return response.status(200).send(squad);
  }

  @Get()
  public async getSquads(@Res() response) {
    return response.status(200).send(await this.squadService.getSquads());
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async createSquad(
    @Body() createSquadRequest: CreateSquadDTO,
    @Res() response,
  ) {
    let squad;
    try {
      squad = await this.squadService.createSquad(createSquadRequest);
    } catch (e) {
      return response.status(400).send(e.message);
    }
    return response.status(200).send(squad);
  }

  @Get('id/:id')
  getSquadById(@Res() response, @Param('id') id) {
    const squad = this.squadService.getSquadById(id);
    if (squad == null) {
      return response.status(400).send('Squad not found');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('id')
  getSquadByToken(@Res() response, @User() user) {
    response.status(200).json(this.squadService.getSquadsByToken(user));
  }

  @UseGuards(JwtAuthGuard)
  @Patch('id/:id')
  addManualPoints(@Res() response, @Param('id') id, @Body() body) {
    const points = this.squadService.addManualPoints(id, body.points);
    if (points == null) {
      return response.status(400).send('Squad not found');
    }
    return response.status(200).send(points);
  }

  @Get('members/:id')
  async getMembers(@Res() response, @Param('id') id) {
    const members = await this.squadService.getMembersBySquad(id);
    if (members == null) {
      return response.status(400).send('Squad not found');
    }
    if (members.length == 0) {
      return response.status(204).send('No members found');
    }
    return response.status(200).send(members);
  }
}
