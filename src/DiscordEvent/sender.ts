import { client } from '../main';

export async function sendMessageToUser(user, message) {
  const guild = await client.guilds.fetch('382938797442334720');
  const member = await guild.members.fetch(user.id);
  await member.send(message);
}
