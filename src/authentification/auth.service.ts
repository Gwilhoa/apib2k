import { Get, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { sleep } from '../main';
import {
  isVerified,
  removeVerified,
  sendVerifiedButton,
} from '../DiscordEvent/authentification';
import { MembersService } from '../members/members.service';
import { SquadsService } from '../squads/squads.service';
import { LoginDto } from '../dto/LoginDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private membersService: MembersService,
    private squadService: SquadsService,
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
    //TODO: remove this
    if (
      (await this.membersService.getMemberById('315431392789921793')) == null
    ) {
      await this.membersService.createMember({
        id: '315431392789921793',
        name: 'Gwilhoa',
        squadid: '1013766309156233236',
      });
    }
    //
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
      if (user.password == password) {
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
