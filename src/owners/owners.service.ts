import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Owner } from './schema/owner.schema';

@Injectable()
export class OwnersService {
  constructor(
    @InjectModel(Owner.name) private ownersModel: Model<Owner>,
  ) { }
  create(createOwnersDto: CreateOwnerDto) {
    const owners = this.ownersModel.create(createOwnersDto)
    return owners;
  }

  async findAll() {
    const owners = await this.ownersModel.find()
    return owners;
  }

  async findOne(id: Types.ObjectId | string) {
    const owners = await this.ownersModel.findById(id).populate("restaurants")
    return owners
  }

  async findOneByUsername(username: string) {
    const owners = await this.ownersModel.findOne({ username }).populate("restaurants")
    return owners
  }

  async addRestaurant(ownerId: Types.ObjectId | string, restaurantId: Types.ObjectId | string) {
    await this.ownersModel.findByIdAndUpdate(ownerId, { $push: { restaurants: restaurantId } }, { new: true, runValidators: true })
  }

  async deleteRestaurant(ownerId: Types.ObjectId | string, restaurantId: Types.ObjectId | string) {
    await this.ownersModel.findByIdAndUpdate(ownerId, { $pull: { restaurants: restaurantId } })
  }

  async update(id: Types.ObjectId | string, updateOwnersDto: UpdateOwnerDto) {
    const updatedOne = await this.ownersModel.findByIdAndUpdate(id, updateOwnersDto)
    return updatedOne
  }

  async remove(id: Types.ObjectId | string) {
    const deletedOne = await this.ownersModel.findById(id)
    if (!deletedOne) throw new NotFoundException()
    if (deletedOne.restaurants.length > 0) throw new BadRequestException("Delete All his Restaurants First")
    await this.ownersModel.findById(id)
    return deletedOne
  }
}
