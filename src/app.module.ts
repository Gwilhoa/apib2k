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
import { GeneralModule } from './general/general.module';
import { AuthModule } from "./authentification/auth.module";

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
  ],
  controllers: [AppController, TitleController],
  providers: [AppService, TitleService],
})
export class AppModule {}
