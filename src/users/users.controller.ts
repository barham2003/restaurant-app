import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseObjId } from 'src/common/mongo-type.pipe';
import { Types } from 'mongoose';
import { ResponseData } from 'src/common/types';
import { UserDocument } from './schema/user.schema';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Public } from 'src/common/public-route.pipe';

@Controller('users')
@UseGuards(AuthGuard)
@UseGuards(RolesGuard)
@Roles(Role.Admin)
export class usersController {
  constructor(private readonly ownersService: UsersService) { }

  @Post()
  async create(@Body() createOwnersDto: CreateUserDto) {
    return await this.ownersService.create(createOwnersDto);
  }

  @Get()
  async findAll(): ResponseData<UserDocument[]> {
    const owners = await this.ownersService.findAll();
    return { message: 'Done', data: owners };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseObjId) id: Types.ObjectId,
  ): ResponseData<UserDocument> {
    const owner = await this.ownersService.findOneById(id);
    return { message: 'Found', data: owner };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjId) id: Types.ObjectId,
    @Body() updateOwnersDto: UpdateUserDto,
  ): ResponseData<null> {
    const isFound = await this.ownersService.update(id, updateOwnersDto);
    if (!isFound) throw new NotFoundException();
    return { message: 'Updated' };
  }

  @Delete(':id')
  async remove(@Param('id') id: Types.ObjectId): ResponseData<null> {
    await this.ownersService.remove(id);
    return { message: 'Deleted' };
  }
}
