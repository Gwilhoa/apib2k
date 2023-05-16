import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../authentification/jwt.guard';
import { ItemService } from './item.service';

@UseGuards(JwtAuthGuard)
@Controller('item')
export class ItemController {
  constructor(readonly itemService: ItemService) {}

  @Get()
  public async getItems() {
    return await this.itemService.getItems();
  }

  @Get('id/:id')
  public async getItemById(id) {
    return await this.itemService.getItemById(id);
  }
}
