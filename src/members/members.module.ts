import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Members } from './members.entity';
import { SquadsService } from 'src/squads/squads.service';
import { Waifu } from '../waifus/waifus.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Squads } from '../squads/squads.entity';
import { AchievementService } from '../achievement/achievement.service';
import { Achievement } from '../achievement/achievement.entity';
import { AuthModule } from '../authentification/auth.module';
import { JwtService } from '@nestjs/jwt';
import { Item } from '../item/item.entity';
import { ItemService } from '../item/item.service';
import { WaifusService } from '../waifus/waifus.service';
import { WaifusMembersService } from '../waifus-members/waifus-members.service';
import { waifusMembers } from '../waifus-members/waifus-members.entity';
import { MyItem } from '../item/myitem.entity';

@Module({
  providers: [
    MembersService,
    SquadsService,
    AchievementService,
    JwtService,
    ConfigService,
    ItemService,
    WaifusService,
    WaifusMembersService,
  ],
  controllers: [MembersController],
  imports: [
    TypeOrmModule.forFeature([Members]),
    TypeOrmModule.forFeature([Waifu]),
    TypeOrmModule.forFeature([Squads]),
    TypeOrmModule.forFeature([Achievement]),
    TypeOrmModule.forFeature([Item]),
    TypeOrmModule.forFeature([waifusMembers]),
    TypeOrmModule.forFeature([MyItem]),
    AuthModule,
    ConfigModule,
  ],
})
export class MembersModule {}
