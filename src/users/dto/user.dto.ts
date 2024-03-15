import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  @ApiProperty({ example: 'John' })
  firstName: string;

  @Expose()
  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @Expose()
  @ApiProperty({ example: 'example@example.com' })
  email: string;

  @Expose()
  @ApiProperty({ example: '+38123456789' })
  phone: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
