import { Module } from '@nestjs/common';
import { NewsItemService } from './services/newsItem.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsItem } from './entity/newsItem.entity';
import { NewsItemController } from './newsItem.controller';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewsItem, User])],
  providers: [NewsItemService],
  controllers: [NewsItemController],
})
export class NewsItemModule {}
