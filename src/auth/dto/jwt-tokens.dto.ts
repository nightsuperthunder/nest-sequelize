import { ApiProperty } from '@nestjs/swagger';

export class JwtTokensDto {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
}
