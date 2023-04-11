import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralController } from './general.controller';
import { General } from './general.entity';
import { GeneralService } from './general.service';

@Module({
  controllers: [GeneralController],
  providers: [GeneralService],
  imports: [TypeOrmModule.forFeature([General])],
})
export class GeneralModule {}
