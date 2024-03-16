import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { AppConfigModule } from './config/app-config.module';
import { DATABASE_CONFIG } from './config/database.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AppConfigModule,
    UsersModule,
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<SequelizeModuleOptions>(DATABASE_CONFIG),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRATION },
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
