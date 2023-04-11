import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { General } from './general.entity';

@Injectable()
export class GeneralService {
    constructor(@InjectRepository(General) private generalRepository: Repository<General>) {}

    public async updateSeason(season) {
        const general = await this.generalRepository.find()[0];
        if (general == null)
        {
            const gen = new General();
            gen.season = season['season'];
            await this.generalRepository.save(gen);
            return gen;
        }
        general.season = season['season'];
        await this.generalRepository.save(general);
        return general;
    }

    public async getSeason() {
        const general = await this.generalRepository.find()[0];
        if (general == null)
        {
            return null;
        }
        return general;
    }
}
