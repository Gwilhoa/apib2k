import { BadRequestException, Injectable, Redirect } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomInt } from 'crypto';
import e, { query } from 'express';
import { waitForDebugger } from 'inspector';
import { AchievementController } from 'src/achievement/achievement.controller';
import { Achievement } from 'src/achievement/achievement.entity';
import { AchievementService } from 'src/achievement/achievement.service';
import { CreateAchievementDTO } from 'src/dto/create-achievement.dto';
import { Squads } from 'src/squads/squads.entity';
import { Title } from 'src/title/title.entity';
import { json } from 'stream/consumers';
import { Double, QueryBuilder, Repository } from 'typeorm';
import { CreateMembersDTO } from '../dto/create-members.dto';
import { MembersDTO } from '../dto/members.dto';
import { WaifuMembersDTO } from '../dto/waifu-members.dto';
import { SquadsService } from '../squads/squads.service';
import { waifusMembers } from '../waifus-members/waifus-members.entity';
import { Waifu } from '../waifus/waifus.entity';
import { WaifusService } from '../waifus/waifus.service';
import { Members } from './members.entity';

@Injectable()
export class MembersService {
	constructor(@InjectRepository(Members) private membersRepository: Repository<Members>, @InjectRepository(Waifu) private waifuRepository: Repository<Waifu>) {} 


	public async createMember(createMemberRequest: CreateMembersDTO) {
		const member: Members = new Members();
		member.id = createMemberRequest?.id;
		member.name = createMemberRequest?.name;
		member.points = 0;
		member.coins = 0;
		member.memevotes = 2;
		const sq = new Squads();
		sq.id = createMemberRequest?.squadid;
		member.squad = sq;

		try {
			await this.membersRepository.save(member);
		} catch (error) {
			if (error.code === "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD") {
				member.name = "débile";
				await this.membersRepository.save(member);
			  }
		}
		const memberDTO: MembersDTO = new MembersDTO();
		memberDTO.id = member.id;
		memberDTO.name = member.name;
		memberDTO.points = member.points;
		memberDTO.squad = member.squad;
		memberDTO.coins = member.coins;

		return memberDTO;
	}

	public async addbestmeme(ids) {
		const member = await this.membersRepository.findOneBy({
			id: ids.id
		});
		if (!member)
			return 0;
		member.bestmeme += 1;
		member.points += 1000;
		await this.membersRepository.save(member);
		return member;
	}

	public async getbestmeme(ids) {
		const member = await this.membersRepository.findOneBy({
			id: ids.id
		});
		if (member)
			return member.bestmeme;
		return 0;
	}


	public async allMembers() {
		const members = await this.membersRepository.createQueryBuilder("members").leftJoinAndSelect("members.squad", "squad").getMany();
		return members;
	}

	public async getMemberById(ids){
		return await this.membersRepository.findOneBy({
			id: ids.id
		})

	}

	public async updateMembers() {
		const members = await this.membersRepository.find();
		for (let i = 0; i < members.length; i++) {
			const member = members[i];
			if (member.memevotes < 3)
				member.memevotes += 1;
			await this.membersRepository.save(member);
		}
	}

	public async addMemeVote(ids) {
		const member = await this.membersRepository.findOneBy({
			id: ids.id
		});
		member.memevotes -= 1;
		await this.membersRepository.save(member);
		return member;
	}

	public async getMemeVote(ids) {
		const member = await this.membersRepository.findOneBy({
			id: ids.id
		});
		return member.memevotes;
	}

	public async addPoints(ids, point)
	{
		const member = await this.membersRepository.findOneBy({
			id: ids.id
		});
		point = parseInt(point);
		if (point + member.points > 2147483647)
			return null;
		member.points += point;
		await this.membersRepository.save(member);
		return point;
	}

	public async removeMember(ids) {
		const member = await this.membersRepository.findOneBy({
			id: ids.id
		});
		if (member)
			await this.membersRepository.remove(member);
	}

	public async addCoins(ids, coin) {
		const member = await this.membersRepository.findOneBy({
			id: ids.id
		});
		coin = parseInt(coin);
		member.coins += coin;
		await this.membersRepository.save(member);
		return member;
	}

	public async addSquad(ids, squad) {
		const member = await this.membersRepository.findOneBy({
			id: ids.id
		});

		if (member)
		{
			const mem2 = new Members();
			mem2.id = member.id;
			mem2.name = member.name;
			mem2.points = member.points;
			mem2.coins = member.coins;
			mem2.squad = squad;
			this.membersRepository.remove(member);
			this.membersRepository.save(mem2);
		}
		return member;
	}

	public async getSquadMembers(ids) {
		const member = await this.membersRepository.findBy({
			squad : ids
		});
		console.log(member);
		return member;
	}

	public async addAchievement(ids, ac) {
		console.log(ac);
		const member = await this.membersRepository.createQueryBuilder("members")
		.leftJoinAndSelect("members.achievements", "achievements")
		.where("members.id = :id", { id: ids.id })
		.getOne();
		console.log(member);
		if (member)
		{
			member.achievements.push(ac);
			await this.membersRepository.save(member);
		}
		return member;
	}

	public async getAchievements(ids) {
		const member = await this.membersRepository.findOneBy({
			id: ids.id
		});
		if (member)
		{
			return member.achievements;
		}
		return null;
	}

	public async revokeAchievement(ids, ac) {
		const member = await this.membersRepository.findOneBy({
			id: ids.id
		});
		if (member)
		{
			var removeIndex = -1;
				var i = 0;
				while (i < member.achievements.length)
				{
					if (member.achievements[i].id == ac)
					{
						console.log(member.achievements[i]);
						removeIndex = i;
					}
					i++;
				}
				member.achievements.splice(removeIndex, 1);
				this.membersRepository.save(member);
		}
		return member;
	}

	public async addTitle(ids, title) {
		const member = await this.membersRepository.findOneBy({
			id: ids.id
		});
		if (member)
		{
			member.titles.forEach(element => {
				if (element.name == title)
				{
					throw new BadRequestException('Title already obtained');
				}
			});
			var title1 = new Title();
			title1.name = title;
			member.titles.push(title1);
			this.membersRepository.save(member);
		}
	}

	public async getTitles(ids) {
		const member = await this.membersRepository.findOneBy({
			id: ids.id
		});
		if (member)
		{
			return member.titles;
		}
	}

	public async setTitle(ids, title) {
		const member = await this.membersRepository.findOneBy({
			id: ids.id
		});
		if (member)
		{
			member.titles.forEach(element => {
				if (element.name == title)
				{
					member.title = element.name;
					this.membersRepository.save(member);
				}
			});
		}
	}

	public async revokeTitle(ids, title) {
		const member = await this.membersRepository.findOneBy({
			id: ids.id
		});
		if (member)
		{
			var removeIndex = -1;
				var i = 0;
				while (i < member.titles.length)
				{
					if (member.titles[i].name == title)
					{
						removeIndex = i;
					}
					i++;
				}
				member.titles.splice(removeIndex, 1);
				this.membersRepository.save(member);
		}
	}

	public async getWaifus(ids) {
		const member = await this.membersRepository.findOneBy({
			id: ids.id
		});
		if (member)
		{
			return member.waifus;
		}
	}

	public async catchWaifu(ids) {
		const member = await this.membersRepository.findOneBy({
			id: ids.id
		});
		if (member)
		{
			var date = new Date();
			date.setTime(member.waifutime);
			date.setHours(date.getHours() + 3);
			var wait = date.getTime();
			if (wait > Date.now())
			{
				return date.getTime();
			}
				var waifus = await this.waifuRepository.find();
				var waifu = waifus[randomInt(0, waifus.length - 1)];
				var catchWaifu = new waifusMembers();
				catchWaifu.waifu = waifu;
				catchWaifu.member = member.id;
				var prob = randomInt(0, 100);
				if (prob >= 99) {
					catchWaifu.rarety = 3;
				} else if (prob >= 90) {
					catchWaifu.rarety = 2;
				} else if (prob >= 70) {
					catchWaifu.rarety = 1;
				} else {
					catchWaifu.rarety = 0;
				}
				if (catchWaifu.rarety == 3){
					if (waifu.legendary >= 1)
					{
						catchWaifu.rarety = 2;
					}
					else
					{
						waifu.legendary += 1;
					}
				}
				if (catchWaifu.rarety == 2)
				{
					if (waifu.epic >= 3)
					{
						catchWaifu.rarety = 1;
					}
					else
					{
						waifu.epic += 1;
					}
				}
				if (catchWaifu.rarety == 1)
				{
					if (waifu.rare >= 5)
					{
						catchWaifu.rarety = 0;
					}
					else
					{
						waifu.rare += 1;
					}
				}
				member.waifutime = Date.now();
				member.waifus.push(catchWaifu);
				this.membersRepository.save(member);
				this.waifuRepository.save(waifu);
				var ret = new WaifuMembersDTO();
				ret.exp = 0;
				ret.waifu = waifu;
				ret.rarety = catchWaifu.rarety;
				ret.id = 'null';
				ret.level = 0;
				return ret;
		}
		return null;
	}

	public async modifyName(ids, name) {
		const member = await this.membersRepository.findOneBy({
			id: ids.id
		});
		if (member)
		{
			member.name = name;
			try {
				await this.membersRepository.save(member);
			} catch (error) {
				if (error.code === "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD") {
					member.name = "débile";
					await this.membersRepository.save(member);
				  }
			}
		}
	}
}
