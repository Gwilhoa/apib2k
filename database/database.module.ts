import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
	  TypeOrmModule.forRoot({
		type: 'mysql',
		host: 'localhost',
		username: 'my_webapp',
		password: 'SCqfMg9b3HZx7rb7saArhx6m',
		database: 'my_webapp',
		entities: [__dirname + '/../**/*.entity{.ts,.js}'],
		synchronize: true,
	  }),
	],
  })
export class DatabaseModule {}
