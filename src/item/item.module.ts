import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { MyItem } from './myitem.entity';

@Module({
  providers: [ItemService],
  controllers: [ItemController],
  imports: [
    TypeOrmModule.forFeature([Item]),
    TypeOrmModule.forFeature([MyItem]),
  ],
})
export class ItemModule {}
