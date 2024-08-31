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
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { Public } from 'src/common/public-route.pipe';

@Controller('users')
@UseGuards(RolesGuard)
@Roles(Role.Admin)
export class usersController {
  constructor(private readonly ownersService: UsersService) { }

  @Post()
  @Public()
  async create(@Body() createOwnersDto: CreateUserDto) {
    const user = await this.ownersService.create(createOwnersDto);
    return user;
  }

  @Get()
  async findAll() {
    const owners = await this.ownersService.findAll();
    return owners;
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjId) id: string) {
    const user = await this.ownersService.findOneById(id);
    return user;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjId) id: string,
    @Body() updateOwnersDto: UpdateUserDto,
  ) {
    const isFound = await this.ownersService.update(id, updateOwnersDto);
    if (!isFound) throw new NotFoundException();
    return 'Updated';
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.ownersService.remove(id);
    return 'Deleted';
  }
}
