import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { ParseObjId } from 'src/common/mongo-type.pipe';
import { Types } from 'mongoose';
import { ResponseData } from 'src/common/types';
import { OwnersDocument } from './schema/owner.schema';

@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) { }

  @Post()
  create(@Body() createOwnersDto: CreateOwnerDto) {
    return this.ownersService.create(createOwnersDto);
  }

  @Get()
  async findAll(): ResponseData<OwnersDocument[]> {
    const owners = await this.ownersService.findAll();
    return { message: "Done", data: owners }
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjId) id: Types.ObjectId): ResponseData<OwnersDocument> {
    const owner = await this.ownersService.findOne(id);
    return { message: "Found", data: owner }
  }


  @Patch(':id')
  update(@Param('id', ParseObjId) id: Types.ObjectId, @Body() updateOwnersDto: UpdateOwnerDto) {
    return this.ownersService.update(id, updateOwnersDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.ownersService.remove(id);
  }
}
