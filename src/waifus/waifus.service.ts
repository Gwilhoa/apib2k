import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Waifu } from './waifus.entity';
import { CreateWaifuDTO } from '../dto/create-waifus.dto';

@Injectable()
export class WaifusService {
  constructor(
    @InjectRepository(Waifu) private waifuRepository: Repository<Waifu>,
  ) {}

  public async createWaifu(createWaifuRequest: CreateWaifuDTO) {
    if (createWaifuRequest.name == null) {
      throw new Error('name is null');
    }
    if (createWaifuRequest.description == null) {
      throw new Error('description is null');
    }
    if (createWaifuRequest.origin == null) {
      throw new Error('origin is null');
    }
    const waifu: Waifu = new Waifu();
    waifu.name = createWaifuRequest.name;
    waifu.description = createWaifuRequest.description;
    waifu.origin = createWaifuRequest.origin;
    waifu.rare = 0;
    waifu.epic = 0;
    waifu.legendary = 0;
    return await this.waifuRepository.save(waifu);
  }

  public async getWaifus() {
    return await this.waifuRepository.find();
  }

  public async getWaifuById(id: number) {
    return await this.waifuRepository.findOneBy({
      id: id,
    });
  }

  public async resetWaifus() {
    const waifus = await this.waifuRepository.find();
    for (const waifu of waifus) {
      waifu.rare = 0;
      waifu.epic = 0;
      waifu.legendary = 0;
      await this.waifuRepository.save(waifu);
    }
    return waifus;
  }

  public async getWaifuByName(name: string) {
    const waifus = await this.waifuRepository
      .createQueryBuilder('waifu')
      .andWhere('waifu.name LIKE :name', { name: '%' + name + '%' })
      .getMany();
    return waifus;
  }
}
