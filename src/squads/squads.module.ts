import { Module } from '@nestjs/common';
import { SquadsController } from './squads.controller';
import { SquadsService } from './squads.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Squads } from './squads.entity';

@Module({
  controllers: [SquadsController],
  providers: [SquadsService],
  imports: [TypeOrmModule.forFeature([Squads])],
})
export class SquadsModule {}
