import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { AppConfigModule } from './config/app-config.module';
import { ConfigService } from '@nestjs/config';
import { DATABASE_CONFIG } from './config/database.config';

@Module({
  imports: [
    AppConfigModule,
    UsersModule,
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<SequelizeModuleOptions>(DATABASE_CONFIG),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
