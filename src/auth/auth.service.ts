import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Auth } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(authUser: Auth): Promise<any> {
    const user = await this.userService.getUserByEmail(authUser);
    if (user && user.password === authUser.password) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.name, sub: user._id };
    return this.jwtService.sign(payload);
  }
}
