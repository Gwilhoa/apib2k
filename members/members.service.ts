import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Squads } from 'src/squads/squads.entity';
import { SquadsService } from 'src/squads/squads.service';
import { Repository } from 'typeorm';
import { CreateMembersDTO } from '../dto/create-members.dto';
import { MembersDTO } from '../dto/members.dto';
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

	public async allMembers() {
		const members = await this.membersRepository.find();
		return members;
	}

	public async getMemberById(ids){
		return await this.membersRepository.findOneBy({
			id: ids.id
		});
	}

	public async addPoints(ids, point)
	{
		console.log(ids.id);
		const member = await this.membersRepository.findOneBy({
			id: ids.id
		});
		if (!member) {
			return null;
		}
		point = parseInt(point);
		member.points += point;
		member.squad.PointsTotal += point;
		console.log(member.points);
		await this.membersRepository.save(member);
		return member;
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
		if (member)
		{
			coin = parseInt(coin);
			member.coins += coin;
			await this.membersRepository.save(member);
		}
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
		return member;
	}

	public async addAchievement(ids, achievement) {
		const member = await this.membersRepository.findOneBy({
			id: ids.id
		});
		if (member)
		{
			member.achievements.push(achievement);
			await this.membersRepository.save(member);
		}
		return member;
	}
}
