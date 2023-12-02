import { client } from '../main';

export async function sendMessageToUser(user, message) {
  const guild = await client.guilds.fetch('382938797442334720');
  const member = await guild.members.fetch(user.id);
  await member.send(message);
}

export async function getAvatarUrl(user) {
  const guild = await client.guilds.fetch('382938797442334720');
  try {
    const member = await guild.members.fetch(user.id);
    return member.user.avatarURL();
  } catch (e) {
    return null;
  }
}
