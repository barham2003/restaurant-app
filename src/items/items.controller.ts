import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ParseObjId } from 'src/common/mongo-type.pipe';
import { ResponseData } from 'src/common/types';
import { ItemDocument } from './schema/item.schema';
import { Public } from 'src/common/public-route.pipe';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async create(
    @Body() createItemDto: CreateItemDto,
  ): ResponseData<ItemDocument> {
    const item = await this.itemsService.create(createItemDto);
    return { message: 'Successfully created', data: item };
  }

  @Get()
  @Public()
  async findAll(): ResponseData<ItemDocument[]> {
    const items = await this.itemsService.findAll();
    return { data: items, message: 'Successfully found' };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseObjId) id: string,
  ): ResponseData<ItemDocument> {
    const item = await this.itemsService.findOne(id);
    if (!item) throw new NotFoundException();
    return { data: item, message: 'Found' };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjId) id: string,
    @Body() updateItemDto: UpdateItemDto,
  ): ResponseData<ItemDocument> {
    const updatedItem = await this.itemsService.update(id, updateItemDto);
    if (!updatedItem) throw new NotFoundException();

    return { data: updatedItem, message: 'Updated' };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseObjId) id: string,
  ): ResponseData<ItemDocument> {
    const item = await this.itemsService.remove(id);
    if (!item) throw new NotFoundException();
    return { data: item, message: 'Successfully Deleted' };
  }
}
