import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { SquadsModule } from './squads/squads.module';
import { MembersModule } from './members/members.module';
import { AchievementModule } from './achievement/achievement.module';
import { TitleService } from './title/title.service';
import { TitleController } from './title/title.controller';
import { WaifusMembersModule } from './waifus-members/waifus-members.module';
import { WaifusModule } from './waifus/waifus.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralModule } from './general/general.module';
import { AuthModule } from './authentification/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UpdateService } from './update.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MembersService } from './members/members.service';
import { Members } from './members/members.entity';
import { Waifu } from './waifus/waifus.entity';
import { AchievementService } from './achievement/achievement.service';
import { SquadsService } from './squads/squads.service';
import { Achievement } from './achievement/achievement.entity';
import { Squads } from './squads/squads.entity';

@Module({
  imports: [
    SquadsModule,
    MembersModule,
    DatabaseModule,
    AchievementModule,
    WaifusMembersModule,
    WaifusModule,
    GeneralModule,
    AuthModule,
    ScheduleModule.forRoot(),
    ConfigModule,
    TypeOrmModule.forFeature([Members]),
    TypeOrmModule.forFeature([Waifu]),
    TypeOrmModule.forFeature([Squads]),
    TypeOrmModule.forFeature([Achievement]),
  ],
  controllers: [AppController, TitleController],
  providers: [
    AppService,
    TitleService,
    UpdateService,
    ConfigService,
    MembersService,
    AchievementService,
    SquadsService,
  ],
})
export class AppModule {}
