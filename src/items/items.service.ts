import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './schema/item.schema';
import { Model, Types } from 'mongoose';
import { Restaurant } from 'src/restaurants/schema/restaurant.schema';
import { Request } from 'express';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private itemModel: Model<Item>,
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) { }

  async create(createItemDto: CreateItemDto) {
    const restaurant = await this.restaurantModel.findById(createItemDto.restaurantId).populate("categories");
    if (!restaurant) throw new NotFoundException('Restaurant not found');

    const category = restaurant.categories.find((category) => createItemDto.category === category.name,); if (!category)
      throw new NotFoundException('Category not found from this restaurant');

    const item = await this.itemModel.create({
      ...createItemDto,
      restaurant: createItemDto.restaurantId,
      category,
    });

    await this.restaurantModel.findOneAndUpdate(
      { _id: createItemDto.restaurantId },
      { $push: { items: item._id } },
    );

    return item;
  }

  async findAll() {
    return await this.itemModel.find().sort({ createdAt: 1 })
  }

  async findOne(id: string | Types.ObjectId) {
    const item = await this.itemModel
      .findById(id)
      .populate('restaurant', ['name', 'logo', 'user']);
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  async update(id: string | Types.ObjectId, updateItemDto: UpdateItemDto,) {
    const restaurant = await this.restaurantModel.findById(updateItemDto.restaurantId)
    const category = restaurant.categories.find(category => updateItemDto.category === category.name)
    if (!category) throw new NotFoundException('Category not found from this restaurant');

    const updatedItem = await this.itemModel.findByIdAndUpdate(
      id,
      { ...updateItemDto, category },
    );
    if (!updatedItem) throw new NotFoundException('Item not found');
    return updatedItem;
  }

  async remove(id: string | Types.ObjectId) {
    const item = await this.itemModel.findByIdAndDelete(id);
    if (!item) throw new NotFoundException();
    return item;
  }
}
