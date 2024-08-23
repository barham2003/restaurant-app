import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant, RestaurantDocument } from './schema/restaurant.schema';
import { Model, Types } from 'mongoose';
import { CreateRestaurantDto } from './dto/CreateRestaurantDto';
import { UpdateRestaurantDto } from './dto/UpdateCatDto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name) private resturantModel: Model<Restaurant>
  ) { }

  async getAll() {
    return await this.resturantModel.find();
  }

  async getOne(id: Types.ObjectId | string) {
    return await this.resturantModel.findById(id).populate("owner", ['username'])
  }

  async create(createRestaurantDto: CreateRestaurantDto) {
    const restaurant = await this.resturantModel.create({ ...createRestaurantDto, owner: createRestaurantDto.ownerId });
    return restaurant
  }

  async delete(id: string | Types.ObjectId): Promise<RestaurantDocument> {
    const result = await this.resturantModel.findByIdAndDelete(id).populate("owner", ['username', "_id"]);
    return result;
  }


  async edit(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    const data = await this.resturantModel.findByIdAndUpdate(id, updateRestaurantDto).populate("owner",);
    if (!data) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return { message: 'Successfully Updated', statusCode: HttpStatus.OK };
  }
}
