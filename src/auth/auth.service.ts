import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { Auth } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async validateUser(authUser: Auth): Promise<User> {
    const user = await this.userService.getUserByEmail(authUser);
    const match = await user.comparePassword(
      authUser.password,
      (error, isMacth) => {
        if (isMacth) {
          return user;
        }
        return null;
      },
    );

    return match;
  }

  async login(user: any) {
    console.log('login', user);
    const payload = { username: user.name, sub: user._id };
    return this.jwtService.sign(payload);
  }
}
