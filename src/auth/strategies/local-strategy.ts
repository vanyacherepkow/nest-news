import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from 'src/user/entity/user.entity';
import { ILogin } from '../auth.controller';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email, password): Promise<User> {
    const user = await this.authService.validate(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
