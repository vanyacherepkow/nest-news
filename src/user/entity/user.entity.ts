import { NewsItem } from 'src/newsItem/entity/newsItem.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  encryptedPassword: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => NewsItem, (newsItem) => newsItem.user)
  newsItems: NewsItem[];
}
