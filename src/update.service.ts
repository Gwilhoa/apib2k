import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MembersService } from './members/members.service';

@Injectable()
export class UpdateService {
  private readonly logger = new Logger(UpdateService.name);

  constructor(readonly membersService: MembersService) {}

  @Cron('0 0 * * *') // Tous les jours à minuit
  async handleVote() {
    this.logger.log('Updating votes');
    await this.membersService.updateMemesVotes();
  }
}
