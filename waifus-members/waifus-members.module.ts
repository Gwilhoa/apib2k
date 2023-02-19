import { Module } from '@nestjs/common';
import { WaifusMembersService } from './waifus-members.service';
import { WaifusMembersController } from './waifus-members.controller';

@Module({
  providers: [WaifusMembersService],
  controllers: [WaifusMembersController]
})
export class WaifusMembersModule {}
