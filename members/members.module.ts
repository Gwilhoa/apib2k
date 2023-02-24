import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Members } from './members.entity';
import { SquadsService } from 'src/squads/squads.service';
import { WaifusModule } from '../waifus/waifus.module';
import { WaifusService } from '../waifus/waifus.service';
import { Waifu } from '../waifus/waifus.entity';

@Module({
  providers: [MembersService],
  controllers: [MembersController],
  imports: [TypeOrmModule.forFeature([Members]), TypeOrmModule.forFeature([Waifu])],
})
export class MembersModule {}
