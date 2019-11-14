import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './interfaces/user.interface';

@Controller()
export class AppController {
  constructor(private readonly userService: AppService) {}

  @Get()
  getHello(@Res() res): string {
    const users = this.userService.getHello();
    return 'djkdkjkdkfdkk';
    //res.status(HttpStatus.OK).json(users);
  }
}
