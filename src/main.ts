// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Client } from 'discord.js';
import { Logger } from '@nestjs/common';
import { DiscordInteractionsHandler } from './discord-interaction.handler';

const channelAnnonce = '1009895934999670885';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin: '*',
  };

  const cors = require('cors');
  const interactionsHandler = app
    .select(AppModule)
    .get(DiscordInteractionsHandler); // Injectez la classe DiscordInteractionsHandler
  client.on('interactionCreate', async (interaction) => {
    interactionsHandler.handleButtonInteraction(interaction); // Utilisez la méthode handleButtonInteraction de DiscordInteractionsHandler
  });
  app.use(cors(corsOptions));
  await app.listen(5000);
}

export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const dotenv = require('dotenv');
dotenv.config();
export const client = new Client({
  intents: [
    'Guilds',
    'GuildMessages',
    'GuildMessageReactions',
    'DirectMessages',
    'DirectMessageReactions',
    'GuildMessages',
    'GuildMessageTyping',
  ],
});
client.login(process.env.DISCORD_TOKEN);

const logger = new Logger('APIB2K');

logger.log('developed by gchatain');
bootstrap();
