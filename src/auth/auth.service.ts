import { Injectable, UnauthorizedException, NotFoundException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService, 
    private jwtService: JwtService
  ) {}
  private readonly logger = new Logger('log:');

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const passwordMatches = await bcrypt.compare(pass, user.password);

    if (passwordMatches) {
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Wrong password!');
  }

  async login(user: any) {
    const validatedUser = await this.validateUser(user.username, user.password);
    const payload = { username: validatedUser._doc.username, sub: validatedUser._doc._id, role: validatedUser._doc.role };

    return {
      user: validatedUser._doc,
      access_token: this.jwtService.sign(payload, {secret: 'secretkey'}),
    };
  }
}
