import { Controller, Post, Body, Get, Request, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { UserDocument } from 'src/schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: UserDocument) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: { username: string, password: string }) {
    try {
      return this.authService.login(loginDto);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
