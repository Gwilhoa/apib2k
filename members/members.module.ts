import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Members } from './members.entity';
import { SquadsService } from 'src/squads/squads.service';

@Module({
  providers: [MembersService],
  controllers: [MembersController],
  imports: [TypeOrmModule.forFeature([Members])],
})
export class MembersModule {}
