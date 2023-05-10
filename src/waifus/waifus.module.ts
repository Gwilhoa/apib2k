import { Module } from '@nestjs/common';
import { WaifusService } from './waifus.service';
import { WaifusController } from './waifus.controller';
import { Waifu } from './waifus.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [WaifusService],
  controllers: [WaifusController],
  imports: [TypeOrmModule.forFeature([Waifu])],
})
export class WaifusModule {}
