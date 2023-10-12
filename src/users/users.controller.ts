import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: Prisma.usersCreateInput) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUser(@Param('id') id: Prisma.usersWhereUniqueInput) {
    return this.usersService.getUser(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id') id: Prisma.usersWhereUniqueInput,
    @Body() updateUserDto: Prisma.usersUpdateInput,
  ) {
    return this.usersService.updateUser({ where: id, data: updateUserDto });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: Prisma.usersWhereUniqueInput) {
    return this.usersService.deleteUser(id);
  }
}
