import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: { newsItems: true } });
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id },
      relations: { newsItems: true },
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.userRepository.delete(id);
    return { message: `Пользователь с ${id} удален` };
  }

  async update(id: number, data: User): Promise<User> {
    await this.userRepository.update(id, data);
    return this.findOne(id);
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (user && bcrypt.compareSync(password, user.encryptedPassword)) {
      return user;
    }
    return null;
  }

  async register(data: Partial<User>): Promise<User> {
    data.encryptedPassword = bcrypt.hashSync(data.encryptedPassword, 8);
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }
}
