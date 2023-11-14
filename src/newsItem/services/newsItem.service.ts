import { Injectable } from '@nestjs/common';
import { NewsItem } from '../entity/newsItem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class NewsItemService {
  constructor(
    @InjectRepository(NewsItem)
    private newsItemRepository: Repository<NewsItem>,
  ) {}

  async findAll(): Promise<NewsItem[]> {
    return await this.newsItemRepository.find({ relations: { user: true } });
  }

  async findOne(id: number): Promise<NewsItem | null> {
    return await this.newsItemRepository.findOne({
      where: { id },
      relations: { user: true },
    });
  }

  async create(data: NewsItem, user: User): Promise<NewsItem> {
    data.userId = user.id;
    const newsItem = this.newsItemRepository.create(data);
    return await this.newsItemRepository.save(newsItem);
  }

  async update(id: number, data: NewsItem): Promise<NewsItem> {
    await this.newsItemRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.newsItemRepository.delete(id);
    return { message: `Новость с id ${id} удалена` };
  }
}
