import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { SignInDto, RefreshTokenDto, JwtTokensDto } from './dto';
import { User } from '../users/models/user.model';
import { ITokensConfig, JWT_CONFIG } from '../config/jwt.config';
import { CreateUserDto } from '../users/dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<JwtTokensDto> {
    const { email, password } = signInDto;

    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException();
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    return await this.generateTokens(user);
  }

  async register(createUserDto: CreateUserDto): Promise<JwtTokensDto> {
    const user = await this.usersService.create(createUserDto);

    return await this.generateTokens(user);
  }

  async refresh(refreshTokenDto: RefreshTokenDto): Promise<JwtTokensDto> {
    const { refreshToken } = refreshTokenDto;

    try {
      //get refresh token secret
      const {
        refresh: { secret },
      } = this.configService.get<ITokensConfig>(JWT_CONFIG);

      //verify refresh token and get user id
      const { sub } = await this.jwtService.verifyAsync(refreshToken, {
        secret,
      });

      const user = await this.usersService.findOne(sub);

      return this.generateTokens(user);
    } catch {
      throw new UnauthorizedException();
    }
  }

  async generateTokens(user: User): Promise<JwtTokensDto> {
    const tokensConf = this.configService.get<ITokensConfig>(JWT_CONFIG);

    const payload = { sub: user.id };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: tokensConf.access.secret,
      expiresIn: tokensConf.access.expiration,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: tokensConf.refresh.secret,
      expiresIn: tokensConf.refresh.expiration,
    });

    return { accessToken, refreshToken };
  }
}
