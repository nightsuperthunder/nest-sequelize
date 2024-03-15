import { registerAs } from '@nestjs/config';
import { config as dotEnvConfig } from 'dotenv';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';

dotEnvConfig({ path: '.env' });

export const DATABASE_CONFIG = 'database-config';

const config: SequelizeModuleOptions = {
  dialect: process.env.SEQUELIZE_DIALECT as Dialect,
  host: process.env.SEQUELIZE_HOST,
  port: +process.env.SEQUELIZE_PORT,
  username: process.env.SEQUELIZE_USERNAME,
  password: process.env.SEQUELIZE_PASSWORD,
  database: process.env.SEQUELIZE_DATABASE,
  autoLoadModels: true,
  synchronize: false,
};

export default registerAs(
  DATABASE_CONFIG,
  (): SequelizeModuleOptions => config,
);
