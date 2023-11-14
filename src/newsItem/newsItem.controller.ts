import {
  Put,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Delete,
  Request,
} from '@nestjs/common';
import { NewsItemService } from './services/newsItem.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { NewsItem } from './entity/newsItem.entity';

@Controller('news-item')
export class NewsItemController {
  constructor(private readonly newsItemService: NewsItemService) {}

  @Get('/')
  async findAll(): Promise<NewsItem[]> {
    return await this.newsItemService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<NewsItem> {
    return await this.newsItemService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() newsItem: NewsItem, @Request() req): Promise<NewsItem> {
    console.log(req.user);
    return this.newsItemService.create(newsItem, req.user);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: NewsItem,
  ): Promise<NewsItem> {
    return await this.newsItemService.update(id, data);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.newsItemService.remove(id);
  }
}
