import {
  Controller,
  Get,
  Put,
  Delete,
  Res,
  Req,
  Request,
  HttpStatus,
  Post,
  Query,
  Body,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserDTO } from '../dto/user.dto';
import { AuthDTO } from '../dto/auth.dto';
import { AuthService } from '../auth/auth.service';

@Controller('api')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  // Retrieve customers list
  @Get('users')
  async getAllCustomer(@Res() res) {
    const users = await this.userService.getAllUser();
    return res.status(HttpStatus.OK).json(users);
  }

  // add a user
  @Post('/user')
  async addUser(@Res() res, @Body() userDTO: UserDTO) {
    const user = await this.userService.addUser(userDTO);
    return res.status(HttpStatus.OK).json({
      message: 'User has been created successfully',
      user,
    });
  }

  // get user by email
  // @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Req() req, @Res() res, @Body() authDTO: AuthDTO) {
    const user = await this.authService.validateUser(authDTO);
    const access_token = await this.authService.login(user);
    res.status(HttpStatus.OK).json({
      access_token,
    });
  }

  @UseGuards(AuthGuard())
  @Get('profile')
  getProfile(@Request() req, @Res() res) {
    res.status(HttpStatus.OK).json(req.user);
  }

  @Get('user/:userID')
  async getCustomer(@Res() res, @Param('userID') userID) {
    const user = await this.userService.getUser(userID);
    if (!user) throw new NotFoundException('Customer does not exist!');
    return res.status(HttpStatus.OK).json(user);
  }

  // Update a user
  @Put('/user/:userID')
  async updateCustomer(
    @Res() res,
    @Param('userID') userID,
    @Body() userDTO: UserDTO,
  ) {
    const customer = await this.userService.updateUser(userID, userDTO);
    if (!customer) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Customer has been successfully updated',
      customer,
    });
  }

  // Delete a customer
  @Delete('/user/:userID')
  async deleteUser(@Res() res, @Param('userID') userID) {
    const user = await this.userService.deleteUser(userID);
    if (!user) throw new NotFoundException('Customer does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'User has been deleted',
      user,
    });
  }
}
