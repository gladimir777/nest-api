import { Document } from 'mongoose';
import { User } from './user.interface';

export interface Post extends Document {
  user: User['id'];
  text: string;
  name: string;
  avatar?: string;
  likes?: [User['id']];
  coments?: [Coment];
  date: Date;
}

export interface Coment extends Document {
  user: User['id'];
  text: string;
  name: string;
  avatar: string;
  likes: [User['id']];
  date: Date;
}
