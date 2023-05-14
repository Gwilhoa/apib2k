import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { waifusMembers } from './waifus-members.entity';

@Injectable()
export class WaifusMembersService {
  constructor(
    @InjectRepository(waifusMembers)
    private waifuMemberRepository: Repository<waifusMembers>,
  ) {}

  public async resetWaifusMembers() {
    const waifusMembers = await this.waifuMemberRepository.find();
    for (const waifuMember of waifusMembers) {
      waifuMember.waifu = null;
      await this.waifuMemberRepository.save(waifuMember);
    }
    return true;
  }
}
