import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { sleep } from '../main';
import {
  isVerified,
  removeVerified,
  sendVerifiedButton,
} from '../DiscordEvent/authentification';
import { MembersService } from '../members/members.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private membersService: MembersService,
  ) {}
  public async createToken(username: string, duration: any) {
    const payload = {
      username: username,
    };
    return await this.jwtService.signAsync(payload, {
      expiresIn: duration,
      secret: process.env.ENCRYPTION_KEY,
    });
  }
  async login(username: string, password: string) {
    if (
      (await this.membersService.getMemberById('881962597526696038')) == null
    ) {
      await this.membersService.createMember({
        id: '881962597526696038',
        name: 'AtlasBot',
        squadid: '0',
      });
      await this.membersService.setPassword(
        '881962597526696038',
        process.env.BOT_PASSWORD,
      );
    }
    const user = await this.membersService.getMemberByName(username);
    if (user == null) throw new Error('user not found');
    let token = null;
    if (!user.password) {
      await sendVerifiedButton(user.id, user.name);
      let i = 0;
      while (!(await isVerified(user.id))) {
        await sleep(1000);
        i++;
        if (i == 20) {
          await removeVerified(user.id);
          throw new Error('timeout');
        }
      }
      if (user.canUseApi) {
        token = await this.createToken(username, '1d');
      } else {
        token = await this.createToken(username, '2h');
      }
    } else {
      if (await this.membersService.verifyPassword(user, password)) {
        if (user.canUseApi) {
          token = await this.createToken(username, '1d');
        } else {
          token = await this.createToken(username, '2h');
        }
      } else {
        throw new Error('password not match');
      }
    }
    return token;
  }
}
