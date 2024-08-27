import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './schema/item.schema';
import { Model, Types } from 'mongoose';
import { Restaurant } from 'src/restaurants/schema/restaurant.schema';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private itemModel: Model<Item>,
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const isExist = await this.restaurantModel.findById(
      createItemDto.restaurantId,
    );
    console.log(isExist);
    if (!isExist) throw new NotFoundException('Restaurant not found');
    const item = await this.itemModel.create({
      ...createItemDto,
      restaurant: createItemDto.restaurantId,
    });
    await this.restaurantModel.findByIdAndUpdate(createItemDto.restaurantId, {
      $push: { items: item._id },
    });
    return item;
  }

  async findAll() {
    return await this.itemModel.find();
  }

  async findOne(id: string | Types.ObjectId) {
    return await this.itemModel
      .findById(id)
      .populate('restaurant', ['name', 'logo']);
  }

  async update(id: string | Types.ObjectId, updateItemDto: UpdateItemDto) {
    return await this.itemModel.findByIdAndUpdate(id, updateItemDto);
  }

  async remove(id: string | Types.ObjectId) {
    return await this.itemModel.findByIdAndDelete(id);
  }
}
