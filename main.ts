import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { env } from 'process';
import { async } from 'rxjs';
import { AppModule } from './app.module';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
}

export function sleep(ms: number) {
	return new Promise((resolve) => {
	  setTimeout(resolve, ms);
	});
  }

  export function getEnvVar(v): string {
	console.log(process.env)
    const ret = process.env[v];
    if (ret === undefined) {
        throw new Error("process.env." + v + " is undefined!");
    }
    return ret;
}
const dotenv = require('dotenv');
dotenv.config();
export const db_host : string = getEnvVar("DB_HOSTNAME");
export const db_username : string = getEnvVar("DB_USERNAME");
export const db_pwd : string = getEnvVar("DB_PWD");
export const db_name : string = getEnvVar("DB_NAME");
export const token : string = getEnvVar("TOKEN");
export const ver : string = '/v1/';
bootstrap();
