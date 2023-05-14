import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomInt } from 'crypto';
import { AchievementService } from 'src/achievement/achievement.service';
import { Title } from 'src/title/title.entity';
import { Repository } from 'typeorm';
import { CreateMembersDTO } from '../dto/create-members.dto';
import * as bcrypt from 'bcrypt';
import { SquadsService } from '../squads/squads.service';
import { waifusMembers } from '../waifus-members/waifus-members.entity';
import { Waifu } from '../waifus/waifus.entity';
import { Members } from './members.entity';
import { CreateSquadDTO } from '../dto/create-squads.dto';
import { channelAnnonce, client } from '../main';
import { TextChannel } from 'discord.js';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Members) private membersRepository: Repository<Members>,
    @InjectRepository(Waifu) private waifuRepository: Repository<Waifu>,
    readonly achievementService: AchievementService,
    readonly squadService: SquadsService,
  ) {}

  public async updateMemesVotes() {
    const members = await this.membersRepository.find();
    for (const member of members) {
      if (member.memevotes < 3) {
        member.memevotes += 1;
        await this.membersRepository.save(member);
      }
    }
  }
  public async createMember(createMembersDTO: CreateMembersDTO) {
    const member: Members = new Members();
    member.id = createMembersDTO.id;
    member.name = createMembersDTO.name;
    member.points = 0;
    member.coins = 0;
    member.memevotes = 2;
    let sq = await this.squadService.getSquadById(createMembersDTO.squadid);
    if (!sq) {
      sq = await this.squadService.getSquadById('0');
      if (sq == null) {
        const defaultSquad = new CreateSquadDTO();
        defaultSquad.id = '0';
        defaultSquad.name = 'Default';
        defaultSquad.color = '#000000';
        sq = await this.squadService.createSquad(defaultSquad);
      }
    }
    member.squad = sq;
    return await this.membersRepository.save(member);
  }

  public async getMembers() {
    return await this.membersRepository
      .createQueryBuilder('members')
      .leftJoinAndSelect('members.squad', 'squad')
      .getMany();
  }

  public async getMemberById(id) {
    return await this.membersRepository.findOneBy({
      id: id,
    });
  }
  public async removeMember(ids) {
    const member = await this.membersRepository.findOneBy({
      id: ids.id,
    });
    if (member) return await this.membersRepository.remove(member);
    return null;
  }

  public async addAchievement(id, achievement_id) {
    const member = await this.membersRepository
      .createQueryBuilder('members')
      .leftJoinAndSelect('members.achievements', 'achievements')
      .where('members.id = :id', { id: id })
      .getOne();
    const achievement = await this.achievementService.getAchievementById(
      achievement_id,
    );
    if (achievement == null) throw new Error('Achievement not found');
    if (member == null) throw new Error('Member not found');
    member.achievements.push(achievement);
    await this.membersRepository.save(member);
    const channel = client.channels.cache.get(channelAnnonce) as TextChannel;
    if (channel != null) {
      await channel.send(
        `<@${id}> a obtenu le succès **${achievement.name}** !`,
      );
    }
    return member.achievements;
  }

  public async getAchievements(ids) {
    const member = await this.membersRepository.findOneBy({
      id: ids.id,
    });
    if (member) {
      return member.achievements;
    }
    return null;
  }

  public async addTitle(id, title) {
    const member = await this.membersRepository
      .createQueryBuilder('members')
      .leftJoinAndSelect('members.titles', 'titles')
      .where('members.id = :id', { id: id })
      .getOne();
    if (member) {
      member.titles.forEach((element) => {
        if (element.name == title) {
          throw new Error('Title already obtained');
        }
      });
      const title1 = new Title();
      title1.name = title;
      member.titles.push(title1);
      return await this.membersRepository.save(member);
    }
    throw new Error('Member not found');
  }

  public async getTitles(id) {
    const member = await this.membersRepository
      .createQueryBuilder('members')
      .leftJoinAndSelect('members.titles', 'titles')
      .where('members.id = :id', { id: id })
      .getOne();
    if (member) {
      return member.titles;
    }
    return null;
  }

  public async getWaifus(id) {
    const member = await this.membersRepository
      .createQueryBuilder('members')
      .leftJoinAndSelect('members.waifus', 'waifus')
      .where('members.id = :id', { id: id })
      .getOne();
    if (member) {
      return member.waifus;
    }
  }

  public async catchWaifu(id) {
    const member = await this.membersRepository.findOneBy({
      id: id,
    });
    if (member) {
      const date = new Date();
      date.setTime(member.waifutime);
      date.setHours(date.getHours() + 3);
      const wait = date.getTime();
      if (wait > Date.now()) {
        throw new Error(wait - Date.now() + ' ms');
      }
      const waifus = await this.waifuRepository.find();
      const waifu = waifus[randomInt(0, waifus.length - 1)];
      const catchWaifu = new waifusMembers();
      catchWaifu.waifu = waifu;
      catchWaifu.member = member.id;
      const prob = randomInt(0, 100);
      if (prob >= 99) {
        catchWaifu.rarety = 3;
      } else if (prob >= 90) {
        catchWaifu.rarety = 2;
      } else if (prob >= 70) {
        catchWaifu.rarety = 1;
      } else {
        catchWaifu.rarety = 0;
      }
      if (catchWaifu.rarety == 3) {
        if (waifu.legendary >= 1) {
          catchWaifu.rarety = 2;
        } else {
          waifu.legendary += 1;
        }
      }
      if (catchWaifu.rarety == 2) {
        if (waifu.epic >= 3) {
          catchWaifu.rarety = 1;
        } else {
          waifu.epic += 1;
        }
      }
      if (catchWaifu.rarety == 1) {
        if (waifu.rare >= 5) {
          catchWaifu.rarety = 0;
        } else {
          waifu.rare += 1;
        }
      }
      member.waifutime = Date.now();
      member.waifus.push(catchWaifu);
      await this.membersRepository.save(member);
      await this.waifuRepository.save(waifu);
      return catchWaifu;
    }
    return null;
  }

  async getMemberByName(username: string) {
    return await this.membersRepository.findOneBy({
      name: username,
    });
  }

  async updatePoints(id, points: any) {
    points = parseInt(points);
    if (isNaN(points)) {
      throw new Error('Points must be a number');
    }
    if (points > -2147483648 && points < 2147483647) {
      const member = await this.membersRepository
        .createQueryBuilder('member')
        .leftJoinAndSelect('member.squad', 'squad')
        .where('member.id = :id', { id })
        .getOne();
      if (!member) {
        throw new Error('Member not found');
      }
      const squad = member.squad;
      member.points += points;
      squad.PointsTotal += points;
      return await this.membersRepository.save(member);
    }
    throw new Error('Points must be between -2147483648 and 2147483647');
  }

  async updateCoins(id, coins: any) {
    const member = await this.getMemberById(id);
    if (!member) {
      throw new Error('Member not found');
    }
    if (coins > -2147483648 && coins < 2147483647) {
      member.coins += coins;
      return await this.membersRepository.save(member);
    }
    throw new Error('Coins must be between -2147483648 and 2147483647');
  }

  async updateTitle(id, new_title: any) {
    const member = await this.membersRepository
      .createQueryBuilder('member')
      .leftJoinAndSelect('member.titles', 'titles')
      .where('member.id = :id', { id })
      .getOne();
    if (!member) throw new Error('Member not found');
    member.titles.forEach((title) => {
      if (title.name.toLowerCase() == new_title.toLowerCase()) {
        member.title = title.name;
      }
    });
  }

  async useVote(id) {
    const member = await this.getMemberById(id);
    if (!member) throw new Error('Member not found');
    if (member.memevotes > 0) {
      member.memevotes -= 1;
      return await this.membersRepository.save(member);
    }
    throw new Error('No votes left');
  }

  async addMeme(id) {
    const member = await this.getMemberById(id);
    if (!member) throw new Error('Member not found');
    member.bestmeme += 1;
    return await this.membersRepository.save(member);
  }

  async changeName(id, name: any) {
    const member = await this.getMemberById(id);
    if (!member) throw new Error('Member not found');
    member.name = name;
    try {
      return await this.membersRepository.save(member);
    } catch (error) {
      throw new Error('NameFormat error');
    }
  }

  async setPassword(id, password: string) {
    const member = await this.getMemberById(id);
    if (!member) throw new Error('Member not found');
    member.password = await bcrypt.hash(password, 10);
    try {
      return await this.membersRepository.save(member);
    } catch (error) {
      throw new Error('Password Format error');
    }
  }

  async verifyPassword(user: Members, password: string) {
    console.log(password);
    console.log(bcrypt.compare(password, user.password))
    return await bcrypt.compare(password, user.password);
  }
}
