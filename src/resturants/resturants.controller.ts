import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, } from '@nestjs/common';
import { ResturantsService } from './resturants.service';
import { Resturant } from 'src/schemas/resturant.schema';
import { ParseObjId } from 'src/common/mongo-type.pipe';

@Controller('resturants')
export class ResturantsController {
  constructor(private readonly resturantsService: ResturantsService) { }

  @Get()
  findAll() {
    return this.resturantsService.getAll()
  }

  @Get("/:id")
  async findOne(@Param('id', ParseObjId) id: string) {
    return await this.resturantsService.getOne(id)
  }

  @Post()
  async addResturant(@Body() createResturantDto: Resturant) {
    const data = await this.resturantsService.create(createResturantDto)
    if (!data) throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    return { message: "Successfully Created", statusCode: HttpStatus.OK, data }
  }


  @Delete("/:id")
  async deleteResturant(@Param('id', ParseObjId) id: string) {
    const result = await this.resturantsService.delete(id)
    if (!result) throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    return { message: "Successfully Deleted", statusCode: HttpStatus.OK }
  }

  @Put("/:id",)
  async editResturant(@Param('id', ParseObjId) id: string, @Body() resturant: Resturant) {
    const data = await this.resturantsService.edit(id, resturant)
    if (!data) throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    return { message: "Successfully Updated", statusCode: HttpStatus.OK }
  }
}
