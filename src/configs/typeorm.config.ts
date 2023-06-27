import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: 'postgres',
  password: 'postgres',
  database: 'singrum-app',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
