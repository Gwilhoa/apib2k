import { client } from '../main';
import { ButtonStyle } from 'discord.js';
const { ButtonBuilder, ActionRowBuilder } = require('discord.js');

const onVerifiedButton = new Map<string, number>();
export async function sendVerifiedButton(id: string, name: string) {
  const user = await client.users.fetch(id);
  if (user == null) {
    return false;
  }
  const button = new ButtonBuilder()
    .setCustomId('approve-connection')
    .setLabel('Approuver la connexion')
    .setStyle(ButtonStyle.Success);

  const row = new ActionRowBuilder().addComponents(button);
  onVerifiedButton.set(id, 0);
  console.log(onVerifiedButton);
  const message =
    'bonjour ' +
    name +
    " veuillez approuver la connexion, si ce n'est pas vous qui avez demandé à vous connecter, veuillez ignorer ce message";
  await user.send({
    content: message,
    components: [row],
  });
  return true;
}

export async function isVerified(id: string) {
  if (onVerifiedButton.get(id) == 1) return true;
  return false;
}

export async function setVerified(id: string) {
  onVerifiedButton.set(id, 1);
}

export async function removeVerified(id: string) {
  onVerifiedButton.delete(id);
}
