import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { SquadsModule } from './squads/squads.module';
import { MembersModule } from './members/members.module';
import { AchievementModule } from './achievement/achievement.module';

@Module({
  imports: [SquadsModule, MembersModule, DatabaseModule, AchievementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
