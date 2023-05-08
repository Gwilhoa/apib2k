import { ver } from '../app.controller';
import { Body, Controller, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/LoginDto';

@Controller(ver + 'auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login')
  async login(@Body() body: LoginDto, @Res() res) {
    let token = null;
    try {
      token = await this.authService.login(body.username, body.password);
    } catch (e) {
      return res.status(400).json({ message_code: e.message });
    }
    return res.status(200).json({ message_code: 'success', token: token });
  }
}
