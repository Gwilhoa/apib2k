import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOSTNAME,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PWD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
      //logging: true,
    }),
  ],
})
export class DatabaseModule {}
