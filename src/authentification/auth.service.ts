import { Injectable, Logger } from '@nestjs/common';
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
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private membersService: MembersService,
  ) {}

  public async createToken(
    id: string,
    username: string,
    duration: any,
    isAdmin: boolean,
  ) {
    const payload = {
      username: username,
      isAdmin: isAdmin,
      id: id,
    };
    return await this.jwtService.signAsync(payload, {
      expiresIn: duration,
      secret: process.env.ENCRYPTION_KEY,
    });
  }

  async login(username: string, password: string) {
    this.logger.log('login ' + username);
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
    if (username == null) throw new Error('username is null');
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
        token = await this.createToken(user.id, username, '2h', true);
      } else {
        token = await this.createToken(user.id, username, '2h', false);
      }
    } else {
      if (await this.membersService.verifyPassword(user, password)) {
        if (user.canUseApi) {
          token = await this.createToken(user.id, username, '2h', true);
        } else {
          token = await this.createToken(user.id, username, '2h', false);
        }
      } else {
        throw new Error('password not match');
      }
    }
    return token;
  }
}
