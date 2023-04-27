import { client } from '../main';
import { ButtonComponent, Component } from 'discord.js';

export async function sendVerifiedButton(id: string) {
  const user = await client.users.fetch(id);
  if (user == null) {
    return false;
  }
  await user.send({
    content: 'Voulez-vous approuver cette connexion ?',
    components: [
      {
        type: Component['TYPES'].ACTION_ROW,
        components: [
          {
            type: Component['TYPES'].BUTTON,
            label: 'Approuver',
            style: ButtonComponent['STYLE'].SUCCESS,
            customId: 'approve-connection',
          },
        ],
      },
    ],
  });
  return true;
}
