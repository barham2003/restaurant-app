import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant, RestaurantDocument } from './schema/restaurant.schema';
import { Model } from 'mongoose';
import { CreateRestaurantDto } from './dto/CreateRestaurantDto';
import { UpdateRestaurantDto } from './dto/UpdateCatDto';
import { User } from 'src/users/schema/user.schema';
import { Item } from 'src/items/schema/item.schema';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name) private resturantModel: Model<Restaurant>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Item.name) private itemModel: Model<Item>,
  ) { }

  async getAll() {
    return await this.resturantModel.find();
  }

  async findOne(id: string) {
    const restaurant = await this.resturantModel
      .findById(id)
      .populate(['user'])
      .exec();

    if (!restaurant) throw new NotFoundException('Restaurant Not Found');
    return restaurant;
  }

  async findRestaurantItems(id: string) {
    const isExist = await this.resturantModel.findById(id);
    if (!isExist) throw new NotFoundException('Restaurant Not Found');
    const items = await this.itemModel.find({ restaurant: id });
    return items;
  }

  async create(createRestaurantDto: CreateRestaurantDto) {
    const user = await this.userModel.findById(createRestaurantDto.userId);
    if (!user) throw new NotFoundException('User not found');
    const restaurant = await this.resturantModel.create({
      ...createRestaurantDto,
      user: createRestaurantDto.userId,
    });

    await this.userModel.findByIdAndUpdate(user._id, {
      $push: { restaurants: restaurant._id },
    });

    if (!restaurant) throw new BadGatewayException('Something went wrong');
    return restaurant;
  }

  async delete(id: string): Promise<RestaurantDocument> {
    const restaurant = await this.resturantModel.findByIdAndDelete(id);
    if (!restaurant) throw new NotFoundException('Restaurant Not Found');
    const userId = restaurant.user._id as string;
    await this.resturantModel.findByIdAndUpdate(userId, {
      $pull: { restaurants: restaurant._id },
    });
    await this.itemModel.deleteMany({ restaurant: id });
    return;
  }

  async edit(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    const data = await this.resturantModel.findByIdAndUpdate(
      id,
      updateRestaurantDto,
    );
    if (!data) throw new NotFoundException('Restaurant Not Found');
    return data;
  }
}
