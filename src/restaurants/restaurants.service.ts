import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant, RestaurantDocument } from './schema/restaurant.schema';
import { Model } from 'mongoose';
import { CreateRestaurantDto } from './dto/CreateRestaurant.dto';
import { UpdateRestaurantDto } from './dto/UpdateCat.dto';
import { User } from 'src/users/schema/user.schema';
import { Item } from 'src/items/schema/item.schema';
import { AddCategoryDto } from './dto/AddCategory.dto';

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
      .findById({ _id: id })
      .populate(['items', 'user'])
      .exec();

    if (!restaurant) throw new NotFoundException('Restaurant Not Found');
    return restaurant;
  }

  async findOneByUserId(userId: string) {
    const restaurant = await this.resturantModel.findOne({ user: userId });
    if (!restaurant) throw new NotFoundException('Restaurant Not Found');
    return restaurant;
  }

  async findRestaurantItems(id: string) {
    const isExist = await this.resturantModel.findById(id);
    if (!isExist) throw new NotFoundException('Restaurant Not Found');
    const items = await this.itemModel.find({ restaurant: id }).sort({ createdAt: -1 });
    return items;
  }

  async addCategory(restaurantId: string, newCategoryDto: AddCategoryDto) {
    const updatedRestaurant: RestaurantDocument =
      await this.resturantModel.findById(restaurantId);
    if (!updatedRestaurant) throw new NotFoundException('Restaurant not found');

    const isCategoryAvailable = updatedRestaurant.categories.find(
      (category) => category.name === newCategoryDto.name,
    );

    if (isCategoryAvailable) throw new ConflictException('Duplicate Category');

    updatedRestaurant.categories.push(newCategoryDto);
    await updatedRestaurant.save();
  }

  async getItemsGrouped(restaurantId: string) {
    const items = await this.itemModel.find({ restaurant: restaurantId })
    const categories = await this.getCategories(restaurantId);
    const groupedItems = categories.map((category) => {
      return {
        items: items.filter((item) => item.category.name === category.name),
        name: category.name,
        otherLanguages: category.otherLanguages,
      };
    });

    return groupedItems;
  }

  async deleteCategory(restaurantId: string, toDeleteCategory: string) {
    const updatedRestaurant: RestaurantDocument = await this.resturantModel.findById(restaurantId);

    if (!updatedRestaurant) throw new NotFoundException('Restaurant not found');

    updatedRestaurant.categories = updatedRestaurant.categories.filter(
      (category) => category.name !== toDeleteCategory,
    );

    await updatedRestaurant.save();
  }

  async getCategories(restaurantId: string) {
    const restaurant = await this.resturantModel.findById(restaurantId);
    if (!restaurant) throw new NotFoundException('Restaurant not found');
    const categories = restaurant.categories;
    return categories;
  }

  async create(createRestaurantDto: CreateRestaurantDto) {
    const user = await this.userModel.findById(createRestaurantDto.userId);
    if (!user) throw new NotFoundException('User not found');
    const restaurant = await this.resturantModel.create({
      ...createRestaurantDto,
      user: createRestaurantDto.userId,
    });

    if (user.restaurant)
      throw new BadRequestException('user already has a restaurant');
    user.restaurant = restaurant._id;

    if (!restaurant) throw new BadGatewayException('Something went wrong');
    await user.save();
    return restaurant;
  }

  async delete(id: string): Promise<void> {
    const restaurant = await this.resturantModel.findByIdAndDelete(id);
    if (!restaurant) throw new NotFoundException('Restaurant Not Found');

    const userId = restaurant.user;
    await this.userModel.findByIdAndUpdate(userId, { restaurant: null });

    await this.itemModel.deleteMany({ restaurant: id });
  }

  async edit(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    const data = await this.resturantModel.findByIdAndUpdate(
      id,
      updateRestaurantDto,
    );
    if (!data) throw new NotFoundException('Restaurant Not Found');
  }
}
