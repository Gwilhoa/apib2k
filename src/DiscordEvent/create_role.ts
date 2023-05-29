import { client } from '../main';

export async function create_role(name, color) {
  const guild = await client.guilds.fetch('382938797442334720');
  return await guild.roles.create({
    name: name,
    color: color,
    mentionable: true,
  });
}
