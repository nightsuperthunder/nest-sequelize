import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { firstName, lastName, email, password, phone } = createUserDto;

    if (await this.userModel.findOne({ where: { email } })) {
      throw new ForbiddenException('User already exists');
    }

    return await this.userModel.create<User>({
      firstName,
      lastName,
      email,
      password,
      phone,
    });
  }

  async findAll() {
    return await this.userModel.findAll<User>();
  }

  async findOne(id: number) {
    const user = await this.userModel.findOne<User>({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findOne<User>({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { firstName, lastName, email, phone } = updateUserDto;

    if (email && (await this.userModel.findOne({ where: { email } }))) {
      throw new ForbiddenException('User already exists');
    }

    await user.update({
      firstName,
      lastName,
      email,
      phone,
    });

    return user;
  }

  async remove(id: number) {
    const user = await this.userModel.findOne<User>({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await user.destroy();
  }
}
