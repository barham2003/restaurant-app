import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantDocument } from 'src/restaurants/schema/restaurant.schema';
import { ParseObjId } from 'src/common/mongo-type.pipe';
import { CreateRestaurantDto } from './dto/CreateRestaurantDto';
import { UpdateRestaurantDto } from './dto/UpdateCatDto';
import { ResponseData } from 'src/common/types';
import { Types } from 'mongoose';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly resturantsService: RestaurantsService) { }

  @Get()
  async findAll(): ResponseData<RestaurantDocument[]> {
    const data = await this.resturantsService.getAll();
    return { data, message: 'Successfully Found' };
  }

  @Get('/:id')
  async findOne(
    @Param('id', ParseObjId) id: Types.ObjectId,
  ): ResponseData<any> {
    const restaurant = await this.resturantsService.findOne(id);
    if (restaurant === undefined || !restaurant)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    return { message: 'Successfully Found', data: restaurant };
  }

  @Post()
  async addRestaurant(
    @Body() createRestaurantDto: CreateRestaurantDto,
  ): ResponseData<RestaurantDocument> {
    const restaurant = await this.resturantsService.create(createRestaurantDto);
    if (!restaurant)
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    return { message: 'Successfully Created', data: restaurant };
  }

  @Delete('/:id')
  async deleteRestaurant(
    @Param('id', ParseObjId) id: Types.ObjectId,
  ): ResponseData<null> {
    const result = await this.resturantsService.delete(id);
    if (!result) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return { message: 'Successfully Deleted' };
  }

  @Put('/:id')
  async editResturant(
    @Param('id', ParseObjId) id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ): ResponseData<null> {
    const result = await this.resturantsService.edit(id, updateRestaurantDto);
    if (!result) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return { message: 'Successfully Updated' };
  }
}
