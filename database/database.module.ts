import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
	  TypeOrmModule.forRoot({
		type: 'mysql',
		host: 'localhost',
		username: 'my_webapp',
		password: 'bqhFseCF7tOkjco5K9V97h35',
		database: 'my_webapp',
		entities: [__dirname + '/../**/*.entity{.ts,.js}'],
		charset: 'utf8mb4',
		synchronize: true,
	  }),
	],
  })
export class DatabaseModule {}
