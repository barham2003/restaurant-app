import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from '../schemas/restaurant.schema';
import { Model } from 'mongoose';
import { CreateRestaurantDto } from './dto/CreateRestaurantDto';
import { UpdateRestaurantDto } from './dto/UpdateCatDto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name) private resturantModel: Model<Restaurant>,
  ) { }

  getAll() {
    return this.resturantModel.find();
  }

  async getOne(id: string) {
    return await this.resturantModel.findById(id);
  }

  async create(createRestaurantDto: CreateRestaurantDto) {
    return await this.resturantModel.create(createRestaurantDto);
  }

  async delete(id: string) {
    const result = await this.resturantModel.findByIdAndDelete(id);
    return result;
  }

  async edit(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    const data = await this.resturantModel.findByIdAndUpdate(id, updateRestaurantDto);
    if (!data) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return { message: 'Successfully Updated', statusCode: HttpStatus.OK };
  }
}
