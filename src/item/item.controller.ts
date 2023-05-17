import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from '../authentification/jwt.guard';
import { ItemService } from './item.service';

@UseGuards(JwtAuthGuard)
@Controller('item')
export class ItemController {
  constructor(readonly itemService: ItemService) {}

  @Get()
  public async getItems(@Res() response){
    return response.status(200).send(await this.itemService.getItems());
  }

  @Post()
  public async createItem(@Res() response, @Body() body){
    let ret;
    try {
      ret = await this.itemService.createItem(
        body.name,
        body.description,
        body.price,
      );
    } catch (e) {
      return response.status(400).send(e.message);
    }
    return response.status(201).send(ret);
  }

  @Get('id/:id')
  public async getItemById(id) {
    return await this.itemService.getItemById(id);
  }
}