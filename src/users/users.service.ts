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
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private ownersModel: Model<User>) { }
  create(createOwnersDto: CreateUserDto) {
    const owners = this.ownersModel.create(createOwnersDto);
    return owners;
  }

  async findAll() {
    const owners = await this.ownersModel.find();
    return owners;
  }

  async findOne(id: Types.ObjectId | string) {
    const owner = await this.ownersModel.findById(id).populate('restaurants');
    if (!owner) throw new ExceptionsHandler();
    return owner;
  }

  async findOneByUsername(username: string) {
    const owner = await this.ownersModel
      .findOne({ username })
      .populate('restaurants');
    if (!owner) throw new ExceptionsHandler();
    return owner;
  }

  async addRestaurant(
    ownerId: Types.ObjectId | string,
    restaurantId: Types.ObjectId | string,
  ) {
    await this.ownersModel.findByIdAndUpdate(
      ownerId,
      { $push: { restaurants: restaurantId } },
      { new: true, runValidators: true },
    );
  }

  async deleteRestaurant(
    ownerId: Types.ObjectId | string,
    restaurantId: Types.ObjectId | string,
  ) {
    await this.ownersModel.findByIdAndUpdate(ownerId, {
      $pull: { restaurants: restaurantId },
    });
  }

  async update(id: Types.ObjectId | string, updateOwnersDto: UpdateUserDto) {
    const updatedOne = await this.ownersModel.findByIdAndUpdate(
      id,
      updateOwnersDto,
    );
    return updatedOne;
  }

  async remove(id: Types.ObjectId | string) {
    const deletedOne = await this.ownersModel.findById(id);
    if (!deletedOne) throw new NotFoundException();
    if (deletedOne.restaurants.length > 0)
      throw new BadRequestException('Delete All his Restaurants First');
    await this.ownersModel.findById(id);
    return deletedOne;
  }
}
