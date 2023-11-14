import { Controller, Post, Request, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthResultDto } from './dto/AuthResultDto.dto';
import { RefreshJwtGuard } from './guards/refresh-jwt.guard';
import { LocalGuard } from './guards/local.guard';
import { ILogin } from './dto/login.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Body() data: ILogin): Promise<AuthResultDto> {
    return await this.authService.singTokens(data);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
