import {
  Put,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { UserService } from './services/user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() user: User): Promise<User> {
    return await this.userService.register(user);
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async findById(@Param('id') id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Get('/')
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() data: User): Promise<User> {
    return await this.userService.update(id, data);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.userService.remove(id);
  }
}
