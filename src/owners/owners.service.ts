import { Injectable } from '@nestjs/common';
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
    const ownerss = await this.ownersModel.find()
    return ownerss;
  }

  async findOne(id: Types.ObjectId | string) {
    const owners = await this.ownersModel.findById(id).populate("restaurants")
    return owners
  }

  async addRestaurant(ownerId: Types.ObjectId | string, restaurantId: Types.ObjectId | string) {
    await this.ownersModel.findByIdAndUpdate(ownerId, { $push: { restaurants: restaurantId } }, { new: true, runValidators: true })
  }

  async deleteRestaurant(ownerId: Types.ObjectId | string, restaurantId: Types.ObjectId | string) {
    console.log("Restaurant", restaurantId)
    await this.ownersModel.findByIdAndUpdate(ownerId, { $pull: { restaurants: restaurantId } })
  }

  update(id: Types.ObjectId, updateOwnersDto: UpdateOwnerDto) {
    return `This action updates a #${id} owners`;
  }

  remove(id: Types.ObjectId) {
    return `This action removes a #${id} owners`;
  }
}
