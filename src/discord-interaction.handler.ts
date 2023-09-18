import { setVerified } from './DiscordEvent/authentification';
import { RoleService } from './role/role.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DiscordInteractionsHandler {
  constructor(private readonly roleService: RoleService) {}

  handleButtonInteraction(interaction: any) {
    if (interaction.isButton()) {
      if (interaction.customId === 'approve-connection') {
        interaction.channel.send('La connexion a été approuvée !');
        interaction.message.delete();
        setVerified(interaction.user.id);
      } else if (interaction.customId.startsWith('add_role')) {
        const args: string[] = interaction.customId.split(';');
        const categoryid = args[1];
        const name = args[2];

        this.roleService.createRole(name, categoryid);
      }
    }
  }
}
