import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/services/user.service';
import { AuthResultDto } from './dto/AuthResultDto.dto';
import { ILogin } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<User> {
    return await this.userService.validate(email, password);
  }

  async singTokens(data: ILogin): Promise<AuthResultDto> {
    const user = await this.validate(data.email, data.password);
    const payload = { id: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '3d' }),
    };
  }

  async refreshToken(user) {
    const payload = { id: user.id, email: user.email};
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
