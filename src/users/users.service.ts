import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Public } from 'src/common/public-route.pipe';

import * as bcrypt from 'bcrypt';
const salt = 10;

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private usersModel: Model<User>) { }
  async create(createUsersDto: CreateUserDto) {
    const originalPassword = createUsersDto.password;
    const hashPassword = await bcrypt.hash(originalPassword, salt);
    const user = await this.usersModel.create({
      ...createUsersDto,
      password: hashPassword,
    });
    return user;
  }

  async findAll() {
    const users = await this.usersModel.find();
    return users;
  }

  @Public()
  async findOneById(id: string) {
    const user = await this.usersModel.findById(id).populate('restaurant', 'name');
    if (!user) throw new NotFoundException();
    return user;
  }

  async findOneByUsername(username: string, withPassword = false) {
    const user = await this.usersModel
      .findOne({ username })
      .populate('restaurant')
      .select(withPassword ? '+password' : '');
    if (!user) throw new NotFoundException('user not found');
    return user;
  }


  async update(id: string, updateUsersDto: UpdateUserDto) {
    const updatedOne = await this.usersModel.findByIdAndUpdate(
      id,
      updateUsersDto,
    );
    return updatedOne;
  }

  async remove(id: string) {
    const deletedOne = await this.usersModel.findById(id);
    if (!deletedOne) throw new NotFoundException();
    if (deletedOne?.restaurant) throw new BadRequestException('Delete All his Restaurants First');
    await this.usersModel.findOneAndDelete({ _id: id });
    return deletedOne;
  }
}
