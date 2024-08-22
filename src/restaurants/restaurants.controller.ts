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
import { RestaurantDocument } from 'src/schemas/restaurant.schema';
import { ParseObjId } from 'src/common/mongo-type.pipe';
import { CreateRestaurantDto } from './dto/CreateRestaurantDto';
import { UpdateRestaurantDto } from './dto/UpdateCatDto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly resturantsService: RestaurantsService) { }

  @Get()
  findAll(): Promise<RestaurantDocument[]> {
    return this.resturantsService.getAll();
  }

  @Get('/:id')
  async findOne(@Param('id', ParseObjId) id: string) {
    const restaurant = await this.resturantsService.getOne(id);
    if (restaurant === undefined || !restaurant) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return { message: "Successfully Found", statusCode: HttpStatus.OK, data: restaurant };
  }

  @Post()
  async addRestaurant(@Body() createResturantDto: CreateRestaurantDto) {
    const data = await this.resturantsService.create(createResturantDto);
    if (!data) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return { message: 'Successfully Created', statusCode: HttpStatus.OK, data };
  }

  @Delete('/:id')
  async deleteRestaurant(@Param('id', ParseObjId) id: string) {
    const result = await this.resturantsService.delete(id);
    if (!result) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return { message: 'Successfully Deleted', statusCode: HttpStatus.OK };
  }

  @Put('/:id')
  async editResturant(
    @Param('id', ParseObjId) id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    const data = await this.resturantsService.edit(id, updateRestaurantDto);
    if (!data) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return { message: 'Successfully Updated', statusCode: HttpStatus.OK };
  }
}
