import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ParseObjId } from 'src/common/mongo-type.pipe';
import { UserItemOwnerShip } from './item-ownership.guard';

@Controller('items')
@UseGuards(UserItemOwnerShip)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    const item = await this.itemsService.create(createItemDto);
    return item;
  }

  @Put(':id')
  async update(
    @Param('id', ParseObjId) id: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    await this.itemsService.update(id, updateItemDto);
    return 'Item successfuly updated';
  }

  @Delete(':id')
  async remove(@Param('id', ParseObjId) id: string) {
    await this.itemsService.remove(id);
    return 'Item successfuly deleted';
  }
}
