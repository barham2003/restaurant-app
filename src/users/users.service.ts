import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Public } from 'src/common/public-route.pipe';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private usersModel: Model<User>) { }
  create(createUsersDto: CreateUserDto) {
    const user = this.usersModel.create(createUsersDto);
    return user;
  }

  async findAll() {
    const users = await this.usersModel.find();
    return users;
  }

  @Public()
  async findOneById(id: Types.ObjectId | string) {
    const user = await this.usersModel.findById(id)
    if (!user) throw new NotFoundException();
    return user;
  }

  async findOneByUsername(username: string) {
    const user = await this.usersModel
      .findOne({ username })
      .populate('restaurants');
    if (!user) throw new NotFoundException();
    return user;
  }


  async deleteRestaurant(
    userId: Types.ObjectId | string,
    restaurantId: Types.ObjectId | string,
  ) {
    await this.usersModel.findByIdAndUpdate(userId, {
      $pull: { restaurants: restaurantId },
    });
  }

  async update(id: Types.ObjectId | string, updateUsersDto: UpdateUserDto) {
    const updatedOne = await this.usersModel.findByIdAndUpdate(
      id,
      updateUsersDto,
    );
    return updatedOne;
  }

  async remove(id: Types.ObjectId) {
    const deletedOne = await this.usersModel.findById(id);
    if (!deletedOne) throw new NotFoundException();
    if (deletedOne.restaurants.length > 0) throw new BadRequestException('Delete All his Restaurants First');
    await this.usersModel.findOneAndDelete({ _id: id.toHexString() });
    return deletedOne;
  }
}
