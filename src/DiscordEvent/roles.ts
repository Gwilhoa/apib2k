import { client } from '../main';
import { Channel, TextBasedChannel, TextChannel } from 'discord.js';

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

export async function roles(name, color) {
  const guild = await client.guilds.fetch('382938797442334720');
  return await guild.roles.create({
    name: name,
    color: color,
    mentionable: true,
  });
}

export async function addRoleToUser(user, role) {
  const guild = await client.guilds.fetch('382938797442334720');
  const member = await guild.members.fetch(user.id);
  const roleToAdd = await guild.roles.fetch(role.id);
  await member.roles.add(roleToAdd);
}

export async function removeRoleFromUser(user, role) {
  const guild = await client.guilds.fetch('382938797442334720');
  const member = await guild.members.fetch(user.id);
  const roleToRemove = await guild.roles.fetch(role.id);
  await member.roles.remove(roleToRemove);
}

export async function sendRoleRequest(
  username: string,
  rolename: string,
  category: string,
) {
  // const salon = client.channels
  const button = new ButtonBuilder()
    .setCustomId('approve-role')
    .setLabel('Approuver')
    .setStyle(ButtonStyle.Success);

  const row = new ActionRowBuilder().addComponents(button);
  const messageContent = `${username} demande l'ajout du rôle ${rolename} dans la catégorie : ${category}`;

  // Créez un objet de message pour envoyer dans le salon
  const messageOptions = {
    content: messageContent,
    components: [row],
  };

  // Envoyez le message dans le salon
  const guild = await client.guilds.cache.get('382938797442334720');
  const channel = await guild.channels.cache.get('1152933969629818952');
  if (!channel || !(channel instanceof TextChannel)) {
    return false;
  }

  // Envoyez le message dans le salon
  await channel.send({ content: messageContent, components: [row] });

  return true;
}
