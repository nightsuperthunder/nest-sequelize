import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformResponseInterceptor } from '../common/interceptors';

@ApiTags('Users')
@Controller('users')
@UseInterceptors(new TransformResponseInterceptor(UserDto))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    type: UserDto,
    description: 'Created user',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    type: [UserDto],
    description: 'Get all users',
  })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    type: UserDto,
    description: 'Get user by id',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({
    status: 200,
    type: UserDto,
    description: 'Update user by id',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({
    status: 200,
    type: UserDto,
    description: 'Delete user by id',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
