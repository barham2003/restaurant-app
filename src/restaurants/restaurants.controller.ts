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
import { Restaurant, RestaurantDocument, RestaurantSchema } from 'src/restaurants/schema/restaurant.schema';
import { ParseObjId } from 'src/common/mongo-type.pipe';
import { CreateRestaurantDto } from './dto/CreateRestaurantDto';
import { UpdateRestaurantDto } from './dto/UpdateCatDto';
import { ResponseData } from 'src/common/types';
import { Types } from 'mongoose';
import { OwnersService } from 'src/owners/owners.service';


@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly resturantsService: RestaurantsService,
    private readonly ownersService: OwnersService
  ) { }

  @Get()
  async findAll(): ResponseData<RestaurantDocument[]> {
    const data = await this.resturantsService.getAll()
    return { data, message: "Successfully Found" };
  }

  @Get('/:id')
  async findOne(@Param('id', ParseObjId) id: Types.ObjectId): ResponseData<RestaurantDocument> {
    const restaurant = await this.resturantsService.getOne(id);
    if (restaurant === undefined || !restaurant) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return { message: "Successfully Found", data: restaurant };
  }

  @Post()
  async addRestaurant(@Body() createResturantDto: CreateRestaurantDto): ResponseData<RestaurantDocument> {
    const owner = await this.ownersService.findOne(createResturantDto.ownerId)
    if (!owner) throw new HttpException('Owner not found', HttpStatus.NOT_FOUND)
    const restaurant = await this.resturantsService.create(createResturantDto);
    if (!restaurant) throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    await this.ownersService.addRestaurant(createResturantDto.ownerId, restaurant._id);
    return { message: 'Successfully Created', data: restaurant };
  }

  @Delete('/:id')
  async deleteRestaurant(@Param('id', ParseObjId) id: Types.ObjectId): ResponseData<null> {
    const result = await this.resturantsService.delete(id);
    if (!result) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    console.log(result)
    const ownerId = result.owner._id as string
    console.log(ownerId)
    await this.ownersService.deleteRestaurant(ownerId, id)

    return { message: 'Successfully Deleted', };
  }

  @Put('/:id')
  async editResturant(
    @Param('id', ParseObjId) id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ): ResponseData<null> {
    const data = await this.resturantsService.edit(id, updateRestaurantDto);
    if (!data) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return { message: 'Successfully Updated', };
  }
}
