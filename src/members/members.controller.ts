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
import { MembersService } from './members.service';
import { ver } from '../app.controller';
import { JwtAuthGuard } from '../authentification/jwt.guard';
import { User } from '../authentification/auth.decorator';

@UseGuards(JwtAuthGuard)
@Controller(ver + 'members')
export class MembersController {
  private logger = new Logger('MembersController');
  constructor(private readonly membersService: MembersService) {}

  @Get()
  async getMembers(@Res() res) {
    const members = await this.membersService.getMembers();
    return res.status(200).json(members);
  }

  @Get('/id')
  async getDefaultMember(@User() token, @Res() res) {
    const member = await this.membersService.getMemberById(token.id);
    if (member == null) {
      return res.status(204).json({ message_code: 'user not found' });
    }
    return res.status(200).json(member);
  }

  @Get('/id/:id')
  async getMemberById(@Param('id') id, @Res() response) {
    const member = await this.membersService.getMemberById(id);
    if (member == null) {
      return response.status(204).json({ message_code: 'user not found' });
    }
    return response.status(200).json(member);
  }

  @Delete('/id/:id')
  async deleteMemberById(@Param('id') id, @Res() response) {
    const member = await this.membersService.removeMember(id);
    if (member == null) {
      return response.status(204).json({ message_code: 'user not found' });
    }
    return response.status(200).json(member);
  }

  @Patch('/name/{id}')
  async changeMemberName(@Param('id') id, @Res() response, @Body() body) {
    const name = body.name;
    if (name == null)
      return response.status(400).json({ message_code: 'invalid body' });
    const member = await this.membersService.changeName(id, name);
    if (member == null) {
      return response.status(204).json({ message_code: 'user not found' });
    }
    return response.status(200).json(member);
  }

  @Get('/achievements/:id')
  async getMemberAchievements(@Param('id') id, @Res() response) {
    const achievements = await this.membersService.getAchievements(id);
    if (achievements == null) {
      return response.status(204).json({ message_code: 'user not found' });
    }
    return response.status(200).json(achievements);
  }

  @Post('/achievements/:id')
  async addMemberAchievements(@Param('id') id, @Res() response, @Body() body) {
    const achievement_id = body.achievement_id;
    if (achievement_id == null)
      return response.status(400).json({ message_code: 'invalid body' });
    let achievements = null;
    try {
      achievements = await this.membersService.addAchievement(
        id,
        achievement_id,
      );
    } catch (e) {
      return response.status(400).json({ message_code: e.message });
    }
    return response.status(200).json(achievements);
  }

  @Patch('/points/:id')
  async updateMemberPoints(@Param('id') id, @Res() response, @Body() body) {
    const points = body.points;
    if (points == null)
      return response.status(400).json({ message_code: 'invalid body' });
    let member = null;
    try {
      member = await this.membersService.updatePoints(id, points);
    } catch (e) {
      return response.status(400).json({ message_code: e.message });
    }
    return response.status(200).json(member);
  }

  @Patch('/coins/:id')
  async updateMemberCoins(@Param('id') id, @Res() response, @Body() body) {
    const coins = body.coins;
    if (coins == null)
      return response.status(400).json({ message_code: 'invalid body' });
    let member = null;
    try {
      member = await this.membersService.updateCoins(id, coins);
    } catch (e) {
      return response.status(400).json({ message_code: e.message });
    }
    return response.status(200).json(member);
  }

  @Get('/title/:id')
  async getMemberTitle(@Param('id') id, @Res() response) {
    const title = await this.membersService.getTitles(id);
    if (title == null) {
      return response.status(204).json({ message_code: 'user not found' });
    }
    return response.status(200).json(title);
  }

  @Post('/title/:id')
  async addMemberTitle(@Param('id') id, @Res() response, @Body() body) {
    const new_title = body.title;
    if (new_title == null)
      return response.status(400).json({ message_code: 'invalid body' });
    let title = null;
    try {
      title = await this.membersService.addTitle(id, new_title);
    } catch (e) {
      return response.status(400).json({ message_code: e.message });
    }
    return response.status(200).json(title);
  }

  @Patch('/title/:id')
  async updateMemberTitle(@Param('id') id, @Res() response, @Body() body) {
    const new_title = body.title;
    if (new_title == null)
      return response.status(400).json({ message_code: 'invalid body' });
    let title = null;
    try {
      title = await this.membersService.updateTitle(id, new_title);
    } catch (e) {
      return response.status(400).json({ message_code: e.message });
    }
    return response.status(200).json(title);
  }

  @Patch('/memesvotes/:id')
  async useVote(@Param('id') id, @Res() response) {
    let member = null;
    try {
      member = await this.membersService.useVote(id);
    } catch (e) {
      return response.status(400).json({ message_code: e.message });
    }
    return response.status(200).json(member);
  }

  @Patch('/memes/:id')
  async addMeme(@Param('id') id, @Res() response) {
    let member = null;
    try {
      member = await this.membersService.addMeme(id);
    } catch (e) {
      return response.status(400).json({ message_code: e.message });
    }
    return response.status(200).json(member);
  }

  @Post('/waifus/:id')
  async catchWaifu(@Param('id') id, @Res() response) {
    let waifuMember = null;
    try {
      waifuMember = await this.membersService.catchWaifu(id);
    } catch (e) {
      return response.status(425).json({ message_code: e.message });
    }
    if (waifuMember == null)
      return response.status(400).json({ message_code: 'invalid user' });
    return response.status(200).json(waifuMember);
  }

  @Get('/waifus/:id')
  async getWaifus(@Param('id') id, @Res() response) {
    const waifus = await this.membersService.getWaifus(id);
    if (waifus == null) {
      return response.status(400).json({ message_code: 'user not found' });
    }
    return response.status(200).json(waifus);
  }
}
