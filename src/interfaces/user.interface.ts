import { Document } from 'mongoose';

export interface User extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  comparePassword(plaintext: string, callback: any): any;
  date: Date;
}
