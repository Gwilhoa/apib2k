import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { MembersService } from '../members/members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Members } from '../members/members.entity';
import { Waifu } from '../waifus/waifus.entity';
import { SquadsService } from '../squads/squads.service';
import { Squads } from '../squads/squads.entity';
import { AchievementService } from '../achievement/achievement.service';
import { Achievement } from '../achievement/achievement.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
    ConfigModule,
    TypeOrmModule.forFeature([Members]),
    TypeOrmModule.forFeature([Waifu]),
    TypeOrmModule.forFeature([Squads]),
    TypeOrmModule.forFeature([Achievement]),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    MembersService,
    ConfigService,
    SquadsService,
    AchievementService,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}