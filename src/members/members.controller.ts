import { Controller, UseGuards } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMembersDTO } from '../dto/create-members.dto';
import { Body, Get, Headers, Param, Post, Res, Response } from '@nestjs/common';
import { sleep } from '../main';
import { ver, token } from '../app.controller';
import { JwtAuthGuard } from '../authentification/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller(ver + 'members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  async getMembers(@Res() res) {
    const members = await this.membersService.getMembers();
    return res.status(200).json(members);
  }
}
