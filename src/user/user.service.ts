import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { Auth } from '../interfaces/auth.interface';
import { UserDTO } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  // fetch all customers
  async getAllUser(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  //add user
  async addUser(createUserDTO: UserDTO): Promise<User> {
    const newUser = await this.userModel(createUserDTO);
    return newUser.save();
  }

  // Get a single user
  async getUser(userID): Promise<User> {
    const user = await this.userModel.findById(userID).exec();
    return user;
  }

  // Get a single user by email
  async getUserByEmail(userAuth: Auth): Promise<any> {
    const user = await this.userModel.findOne({ email: userAuth.email }).exec();
    return user;
  }

  // Edit user
  async updateUser(userID, userDTO: UserDTO): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userID,
      userDTO,
      { new: true },
    );
    return updatedUser;
  }

  // Delete a user
  async deleteUser(userID): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndRemove(userID);
    return deletedUser;
  }
}
