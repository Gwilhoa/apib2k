// discord-interactions.handler.ts

import { Injectable } from '@nestjs/common';
import { RoleService } from './role/role.service';
import { setVerified } from './DiscordEvent/authentification'; // Assurez-vous d'importer RoleService

@Injectable()
export class DiscordInteractionsHandler {
  constructor(private readonly roleService: RoleService) {}

  handleButtonInteraction(interaction: any) {
    if (
      interaction.isButton() &&
      interaction.customId === 'approve-connection'
    ) {
      interaction.channel.send('La connexion a été approuvée !');
      interaction.message.delete();
      setVerified(interaction.user.id);
    } else if (
      interaction.isButton() &&
      interaction.customId.startsWith('add_role')
    ) {
      const args: string[] = interaction.customId.split(';');
      const categoryid = args[1];
      const name = args[2];

      this.roleService.createRole(name, categoryid);
    }
  }
}
