import { setVerified } from './DiscordEvent/authentification';
import { RoleService } from './role/role.service';
import { Injectable } from '@nestjs/common';
import { client } from './main';
import { TextChannel } from 'discord.js';

@Injectable()
export class DiscordInteractionsHandler {
  constructor(private readonly roleService: RoleService) {}

  async handleButtonInteraction(interaction: any) {
    if (interaction.isButton()) {
      if (interaction.customId === 'approve-connection') {
        interaction.channel.send('La connexion a été approuvée !');
        interaction.message.delete();
        setVerified(interaction.user.id);
      } else if (interaction.customId.startsWith('add_role')) {
        const args: string[] = interaction.customId.split(';');
        const categoryid = args[1];
        const name = args[2];

        try {
          this.roleService.createRole(name, categoryid);
        } catch (e) {
          const guild = await client.guilds.cache.get('382938797442334720');
          const channel = await guild.channels.cache.get('1152933969629818952');

          if (!channel || !(channel instanceof TextChannel)) {
            return false;
          }
          await channel.send('déjà existant');
        }
      }
    }
  }
}
