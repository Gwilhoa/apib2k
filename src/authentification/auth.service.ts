import { Get, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { client } from '../main';
import { sendVerifiedButton } from '../DiscordEvent/authentification';
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

  async register(username: string) {
    console.log('register');
    if (
      (await this.membersService.getMemberById('315431392789921793')) == null
    ) {
      //TODO: ajouter pour les tests les escouades
      await this.membersService.createMember({
        id: '315431392789921793',
        name: 'Gwilhoa',
        squadid: '1013766309156233236',
      });
      const user = await this.membersService.getMemberByName(username);
      if (user == null) {
        return null;
      }
      if (!user.password) {
        if (await sendVerifiedButton(user.id)) {
          return await this.createToken(username, '1d');
        } else {
          return null;
        }
      }
    }
  }
}
