import { ver } from '../app.controller';
import { Body, Controller, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';

@Controller(ver + 'auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/register')
  async register(@Body() body, @Res() res) {
    if (body.username == null) {
      return res.status(400).json({ message_code: 'error' });
    }
    const token = await this.authService.register(body.username);
    if (token == null) {
      return res.status(409).json({ message_code: 'error' });
    }
  }

  @Get()
  async getToken(@Body() body: LoginDto) {
    return await this.authService.createToken('test', '1d');
  }
}
