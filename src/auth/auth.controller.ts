import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto';
import { SignInDto, JwtTokensDto, RefreshTokenDto } from './dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({
    status: 200,
    type: JwtTokensDto,
    description: 'JWT tokens',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    return res.status(200).json(await this.authService.signIn(signInDto));
  }

  @Post('register')
  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({
    status: 200,
    type: JwtTokensDto,
    description: 'JWT tokens',
  })
  @ApiResponse({
    status: 403,
    description: 'Bad request',
  })
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return res.status(200).json(await this.authService.register(createUserDto));
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 200,
    type: JwtTokensDto,
    description: 'JWT tokens',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Res() res: Response,
  ) {
    return res
      .status(200)
      .json(await this.authService.refresh(refreshTokenDto));
  }
}
