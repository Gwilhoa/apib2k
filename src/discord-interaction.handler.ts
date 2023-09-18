import { setVerified } from './DiscordEvent/authentification';
import { RoleService } from './role/role.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DiscordInteractionsHandler {
  constructor(private readonly roleService: RoleService) {}

  handleButtonInteraction(interaction: any) {
    if (
      interaction.isButton() &&
      interaction.customId === 'approve-connection'
    ) {
      if (!interaction.customData?.messageSent) {
        // Vérifiez si le message a déjà été envoyé
        interaction.channel.send('La connexion a été approuvée !');
        interaction.customData = { messageSent: true }; // Marquez que le message a été envoyé
        interaction.message.delete();
        setVerified(interaction.user.id);
      }
    } else if (
      interaction.isButton() &&
      interaction.customId.startsWith('add_role')
    ) {
      if (!interaction.customData?.roleCreated) {
        // Vérifiez si le rôle a déjà été créé
        const args: string[] = interaction.customId.split(';');
        const categoryid = args[1];
        const name = args[2];

        this.roleService.createRole(name, categoryid);
        interaction.customData = { roleCreated: true }; // Marquez que le rôle a été créé
      }
    }
  }
}
