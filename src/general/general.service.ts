import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { General } from './general.entity';

@Injectable()
export class GeneralService {
    constructor(@InjectRepository(General) private generalRepository: Repository<General>) {}

    public async updateSeason(name) {
        console.log(name);
        const season = await this.generalRepository.findOneBy({key: 'season'});
        if (season == null)
        {
            const newSeason = new General();
            newSeason.key = 'season';
            newSeason.value = name;
            await this.generalRepository.save(newSeason);
        }
        else
        {
            season.value = name;
            await this.generalRepository.save(season);
        }
    }

    public async getSeason() {
        const general = await this.generalRepository.findOneBy({key: 'season'});
        return general;
    }
}
