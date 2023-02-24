import { NestFactory } from '@nestjs/core';
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
    const ret = process.env[v];
    if (ret === undefined) {
        throw new Error("process.env." + v + " is undefined!");
    }
    return ret;
}
const dotenv = require('dotenv');
dotenv.config();
bootstrap();
