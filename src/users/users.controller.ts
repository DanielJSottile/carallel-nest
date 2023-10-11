import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { users as User, Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: Prisma.usersCreateInput) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: Prisma.usersWhereUniqueInput) {
    return this.usersService.getUser(id);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: Prisma.usersWhereUniqueInput,
    @Body() updateUserDto: Prisma.usersUpdateInput,
  ) {
    return this.usersService.updateUser({ where: id, data: updateUserDto });
  }

  @Delete(':id')
  deleteUser(@Param('id') id: Prisma.usersWhereUniqueInput) {
    return this.usersService.deleteUser(id);
  }
}
