import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @IsEmail()
  @Length(6, 50)
  @ApiProperty({ example: 'example@example.com' })
  email: string;

  @IsNotEmpty()
  @Length(6, 50)
  @ApiProperty({ example: 'password' })
  password: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  @ApiProperty({ example: '+38123456789' })
  phone: string;
}
