import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'John' })
  firstName: string;
  @ApiProperty({ example: 'Doe' })
  lastName: string;
  @ApiProperty({ example: 'example@example.com' })
  email: string;
  @ApiProperty({ example: '+38123456789' })
  phone: string;
}
