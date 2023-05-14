import { Module } from '@nestjs/common';
import { WaifusMembersService } from './waifus-members.service';
import { WaifusMembersController } from './waifus-members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { waifusMembers } from './waifus-members.entity';

@Module({
  providers: [WaifusMembersService],
  controllers: [WaifusMembersController],
  imports: [TypeOrmModule.forFeature([waifusMembers])],
})
export class WaifusMembersModule {}
