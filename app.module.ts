import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
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


@Module({
  imports: [ SquadsModule, MembersModule, DatabaseModule, AchievementModule, WaifusMembersModule, WaifusModule],
  controllers: [AppController, TitleController],
  providers: [AppService, TitleService],
})
export class AppModule {}
