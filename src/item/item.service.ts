import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { MembersService } from '../members/members.service';
import { MyItem } from './myitem.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    @InjectRepository(MyItem) private myitemRepository: Repository<MyItem>,
  ) {}

  async createItem(name: string, description: string, price: number) {
    if (name == null || description == null || price == null)
      throw new Error('Missing parameters');
    const item = new Item();
    item.name = name;
    item.description = description;
    item.price = price;
    return await this.itemRepository.save(item);
  }

  async getItems() {
    return await this.itemRepository.find();
  }

  async getItemById(id) {
    return await this.itemRepository.findOneBy({ id: id });
  }

  async getItemByName(name) {
    return await this.itemRepository
      .createQueryBuilder('item')
      .andWhere('item.name LIKE :name', { name: name })
      .getMany();
  }

  saveMyItem(myitem: MyItem) {
    return this.myitemRepository.save(myitem);
  }
}
