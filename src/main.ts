import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Client } from 'discord.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin: '*',
  };

  const cors = require('cors');

  app.use(cors(corsOptions));

  await app.listen(42000);
}

export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
const dotenv = require('dotenv');
dotenv.config();
const client = new Client({
  intents: [
    'Guilds',
    'GuildMessages',
    'GuildMessageReactions',
    'DirectMessages',
    'DirectMessageReactions',
  ],
});
client.login(process.env.DISCORD_TOKEN);
client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton() && interaction.customId === 'approve-connection') {
    await interaction.reply('La connexion a été approuvée !');
  }
});
export { client };
bootstrap();
