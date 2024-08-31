import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { ParseObjId } from 'src/common/mongo-type.pipe';
import { CreateRestaurantDto } from './dto/CreateRestaurant.dto';
import { UpdateRestaurantDto } from './dto/UpdateCat.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { Public } from 'src/common/public-route.pipe';
import { DeleteCategoryDto } from './dto/DeleteCategory.dto';
import { AddCategoryDto } from './dto/AddCategory.dto';
import { RestaurantOwnerShip } from './restaurant-ownership.guard';

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

  @Get('/:id/grouped-items')
  @Public()
  async getGroupedItems(@Param('id', ParseObjId) id: string) {
    const items = await this.resturantsService.getItemsGrouped(id);
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
    await this.resturantsService.delete(id);
    return 'Successfully Deleted';
  }

  @Put('/:id')
  @Roles(Role.Admin)
  async editResturant(
    @Param('id', ParseObjId) id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    await this.resturantsService.edit(id, updateRestaurantDto);
    return 'Successfully updated';
  }

  @Patch('/:id/categories')
  @UseGuards(RestaurantOwnerShip)
  async addCategory(
    @Param('id', ParseObjId) restaurantId: string,
    @Body() newCategoryDto: AddCategoryDto,
  ) {
    await this.resturantsService.addCategory(restaurantId, newCategoryDto);
    return `${newCategoryDto.name} added successfuly`;
  }

  @Delete('/:id/categories')
  @UseGuards(RestaurantOwnerShip)
  async deleteCategory(
    @Param('id', ParseObjId) restaurantId: string,
    @Body() deleteCategoryDto: DeleteCategoryDto,
  ) {
    await this.resturantsService.deleteCategory(
      restaurantId,
      deleteCategoryDto.name,
    );

    return 'Deleted category successfuly';
  }
}
