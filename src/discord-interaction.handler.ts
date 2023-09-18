import { setVerified } from './DiscordEvent/authentification';
import { RoleService } from './role/role.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DiscordInteractionsHandler {
  private interactionsHandled: Set<string> = new Set<string>(); // Utilisez un ensemble pour stocker les interactions traitées

  constructor(private readonly roleService: RoleService) {}

  handleButtonInteraction(interaction: any) {
    const interactionKey = `${interaction.user.id}:${interaction.customId}`;

    if (
      interaction.isButton() &&
      !this.interactionsHandled.has(interactionKey)
    ) {
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

      this.interactionsHandled.add(interactionKey); // Marquez l'interaction comme traitée
    }
  }
}
