import { Injectable } from '@nestjs/common';
import { ver } from './app.controller';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
