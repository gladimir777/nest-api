import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from '../interfaces/auth.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(authDTO: Auth): Promise<any> {
    const user = await this.authService.validateUser(authDTO);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
