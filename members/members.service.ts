import { BadRequestException, Injectable, Redirect } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e, { query } from 'express';
import { AchievementController } from 'src/achievement/achievement.controller';
import { Achievement } from 'src/achievement/achievement.entity';
import { AchievementService } from 'src/achievement/achievement.service';
import { CreateAchievementDTO } from 'src/dto/create-achievement.dto';
import { Squads } from 'src/squads/squads.entity';
import { Title } from 'src/title/title.entity';
import { QueryBuilder, Repository } from 'typeorm';
import { CreateMembersDTO } from '../dto/create-members.dto';
import { MembersDTO } from '../dto/members.dto';
import { SquadsService } from '../squads/squads.service';
import { Members } from './members.entity';

@Injectable()
export class MembersService {
	constructor(@InjectRepository(Members) private membersRepository: Repository<Members>) {}

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

		await this.membersRepository.save(member);

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
		const members = await this.membersRepository.find();
		return members;
	}

	public async getMemberById(ids){
		return await this.membersRepository.findOneBy({
			id: ids.id
		});
	}

	public async updateMembers() {
		const members = await this.membersRepository.find();
		for (let i = 0; i < members.length; i++) {
			const member = members[i];
			member.memevotes = 1;
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
		const member = await this.membersRepository.findOneBy({
			id: ids.id
		});
		if (member)
		{
			member.achievements.forEach(element => {
				if (element.id == ac)
				{
					throw new BadRequestException('Achievement already exists');
				}
			});
			const ach = this.membersRepository.createQueryBuilder('members');
			ach.relation(Members, 'achievements').of(member).add(ac);
			ach.execute();
			
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
}
