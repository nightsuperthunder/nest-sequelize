import { registerAs } from '@nestjs/config';

interface IJwtConfig {
  secret: string;
  expiration: string;
}

export interface ITokensConfig {
  access: IJwtConfig;
  refresh: IJwtConfig;
}

export const JWT_CONFIG = 'jwt-config';

const jwtConfig = registerAs(
  JWT_CONFIG,
  (): ITokensConfig => ({
    access: {
      secret: process.env.JWT_ACCESS_SECRET,
      expiration: process.env.JWT_ACCESS_EXPIRATION,
    },
    refresh: {
      secret: process.env.JWT_REFRESH_SECRET,
      expiration: process.env.JWT_REFRESH_EXPIRATION,
    },
  }),
);

export default jwtConfig;
