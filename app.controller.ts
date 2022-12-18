import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

const ver = '/v1/';
const secrettoken = 'b2k-admin205.1-2022-gwil42lyon-nekixilam';

export { ver, secrettoken };
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
