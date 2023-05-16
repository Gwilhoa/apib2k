import { Module } from '@nestjs/common';
import { WaifusService } from './waifus.service';
import { WaifusController } from './waifus.controller';
import { Waifu } from './waifus.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaifusMembersService } from '../waifus-members/waifus-members.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { waifusMembers } from '../waifus-members/waifus-members.entity';

@Module({
  providers: [WaifusService, WaifusMembersService, ConfigService],
  controllers: [WaifusController],
  imports: [
    TypeOrmModule.forFeature([Waifu]),
    TypeOrmModule.forFeature([waifusMembers]),
  ],
})
export class WaifusModule {}
