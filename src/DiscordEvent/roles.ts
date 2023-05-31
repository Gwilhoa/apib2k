import { client } from '../main';

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
