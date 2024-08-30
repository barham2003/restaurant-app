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
import { ParseObjId } from 'src/common/mongo-type.pipe';
import { CreateRestaurantDto } from './dto/CreateRestaurantDto';
import { UpdateRestaurantDto } from './dto/UpdateCatDto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { Public } from 'src/common/public-route.pipe';

@Controller('restaurants')
@UseGuards(RolesGuard)
export class RestaurantsController {
  constructor(private readonly resturantsService: RestaurantsService) { }

  @Get()
  @Roles(Role.Admin)
  async findAll() {
    const data = await this.resturantsService.getAll();
    return data;
  }

  @Get('/:id')
  @Public()
  async findOne(@Param('id', ParseObjId) id: string) {
    const restaurant = await this.resturantsService.findOne(id);
    return restaurant;
  }

  @Get('/:id/items')
  @Public()
  async findRestaurantItems(@Param('id', ParseObjId) id: string) {
    const items = await this.resturantsService.findRestaurantItems(id);
    return items;
  }

  @Post()
  @Roles(Role.Admin)
  async addRestaurant(@Body() createRestaurantDto: CreateRestaurantDto) {
    const restaurant = await this.resturantsService.create(createRestaurantDto);
    return restaurant;
  }

  @Delete('/:id')
  @Roles(Role.Admin)
  async deleteRestaurant(@Param('id', ParseObjId) id: string) {
    const result = await this.resturantsService.delete(id);
    if (!result) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return 'Successfully Deleted';
  }

  @Put('/:id')
  @Roles(Role.Admin)
  async editResturant(
    @Param('id', ParseObjId) id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    const result = await this.resturantsService.edit(id, updateRestaurantDto);
    if (!result) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return 'Successfully Updated';
  }
}
