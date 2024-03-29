import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSquadDTO } from '../dto/create-squads.dto';
import { Squads } from './squads.entity';
import { Members } from '../members/members.entity';

@Injectable()
export class SquadsService {
  private logger = new Logger('SquadsService');

  constructor(
    @InjectRepository(Squads) private squadsRepository: Repository<Squads>,
    @InjectRepository(Members) private membersRepository: Repository<Members>,
  ) {}

  public async updateSquad() {
    const squads = await this.squadsRepository.find();
    for (const squad of squads) {
      const members = await this.getMembersBySquad(squad.id);
      let points = 0;
      for (const member of members) {
        points += parseInt(member.points.toString());
      }
      points += parseInt(squad.PointsGiven.toString());
      squad.PointsTotal = points;
      await this.squadsRepository.save(squad);
    }
  }

  public async removeSquad(id) {
    const squad = await this.squadsRepository.findOneBy({ id: id });
    const defaultSquad = await this.squadsRepository.findOneBy({ id: '0' });
    if (squad == null) {
      return null;
    }
    const members = squad.members;
    for (const member of members) {
      member.squad = defaultSquad;
      await this.membersRepository.save(member);
    }
    return await this.squadsRepository.remove(squad);
  }

  public async getSquads() {
    return await this.squadsRepository.find();
  }

  public async createSquad(createSquadRequest: CreateSquadDTO) {
    if (
      await this.squadsRepository.findOneBy({ name: createSquadRequest.id })
    ) {
      throw new Error('Squad id already exists');
    }
    if (createSquadRequest.name == null) {
      throw new Error('Name is null');
    }
    const squad: Squads = new Squads();
    squad.id = createSquadRequest.id;
    squad.name = createSquadRequest.name;
    squad.PointsGiven = 0;
    squad.PointsTotal = 0;
    if (createSquadRequest.color == null) {
      createSquadRequest.color = '#000000';
    }
    squad.color = createSquadRequest.color;
    return await this.squadsRepository.save(squad);
  }

  public async getSquadById(id) {
    return await this.squadsRepository.findOneBy({
      id: id,
    });
  }

  public async addManualPoints(id, amount) {
    const squad = await this.getSquadById(id);
    if (!squad) {
      return null;
    }
    amount = parseInt(amount);
    squad.PointsGiven += amount;
    squad.PointsTotal += amount;
    return await this.squadsRepository.save(squad);
  }

  public async getMembersBySquad(id) {
    const squad = await this.squadsRepository
      .createQueryBuilder('squad')
      .leftJoinAndSelect('squad.members', 'members')
      .where('squad.id = :id', { id: id })
      .getOne();
    if (!squad) {
      return null;
    }
    let members = squad.members;
    if (!members || members.length === 0) {
      return [];
    }
    members = members.sort((a, b) => b.points - a.points);
    return members;
  }

  async getSquadsByToken(user) {
    const member = await this.membersRepository
      .createQueryBuilder('members')
      .leftJoinAndSelect('members.squad', 'squad')
      .where('members.id IN (:...id)', { id: user })
      .getOne();
    if (member == null) {
      return null;
    }
    return member.squad;
  }
}
