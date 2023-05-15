import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

const dotenv = require('dotenv');
dotenv.config();
const token = process.env.TOKEN;
const ver = process.env.PREFIX;

export { token, ver };
@Controller(ver)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
