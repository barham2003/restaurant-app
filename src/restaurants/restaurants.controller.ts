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
  UseGuards,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantDocument } from 'src/restaurants/schema/restaurant.schema';
import { ParseObjId } from 'src/common/mongo-type.pipe';
import { CreateRestaurantDto } from './dto/CreateRestaurantDto';
import { UpdateRestaurantDto } from './dto/UpdateCatDto';
import { ResponseData } from 'src/common/types';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { Public } from 'src/common/public-route.pipe';
import { ItemDocument } from 'src/items/schema/item.schema';

@Controller('restaurants')
@UseGuards(RolesGuard)
export class RestaurantsController {
  constructor(private readonly resturantsService: RestaurantsService) { }

  @Get()
  @Roles(Role.Admin)
  async findAll(): ResponseData<RestaurantDocument[]> {
    const data = await this.resturantsService.getAll();
    return { data, message: 'Successfully Found' };
  }

  @Get('/:id')
  @Public()
  async findOne(@Param('id', ParseObjId) id: string): ResponseData<any> {
    const restaurant = await this.resturantsService.findOne(id);

    return { message: 'Successfully Found', data: restaurant };
  }

  @Get('/:id/items')
  @Public()
  async findRestaurantItems(
    @Param('id', ParseObjId) id: string,
  ): ResponseData<ItemDocument[]> {
    const items = await this.resturantsService.findRestaurantItems(id);

    return { message: 'Successfully Found', data: items };
  }

  @Post()
  @Roles(Role.Admin)
  async addRestaurant(
    @Body() createRestaurantDto: CreateRestaurantDto,
  ): ResponseData<RestaurantDocument> {
    const restaurant = await this.resturantsService.create(createRestaurantDto);
    if (!restaurant)
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    return { message: 'Successfully Created', data: restaurant };
  }

  @Delete('/:id')
  @Roles(Role.Admin)
  async deleteRestaurant(
    @Param('id', ParseObjId) id: string,
  ): ResponseData<null> {
    const result = await this.resturantsService.delete(id);
    if (!result) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return { message: 'Successfully Deleted' };
  }

  @Put('/:id')
  @Roles(Role.Admin)
  async editResturant(
    @Param('id', ParseObjId) id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ): ResponseData<null> {
    const result = await this.resturantsService.edit(id, updateRestaurantDto);
    if (!result) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return { message: 'Successfully Updated' };
  }
}
