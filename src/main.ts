import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Client } from 'discord.js';
import { setVerified } from './DiscordEvent/authentification';
import { ver } from './app.controller';
import { Logger } from '@nestjs/common';
import { RoleService } from './role/role.service';

export const channelAnnonce = '1009895934999670885';
let app;
async function bootstrap() {
  app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin: '*',
  };

  const cors = require('cors');

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
const client = new Client({
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

export { client };
const logger = new Logger('APIB2K');

logger.log('version ' + ver);
logger.log('developed by gchatain');
bootstrap();
