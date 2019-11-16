/*export class PostDTO {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly avatar: string;
  readonly date: Date;
}*/

import { User } from '../interfaces/user.interface';

export class PostDTO {
  user: User['id'];
  text: string;
  name: string;
  avatar: string;
  likes?: [User['id']];
  coments?: [ComentDTO];
  date: Date;
}

export class ComentDTO {
  user: User['id'];
  text: string;
  name?: string;
  avatar?: string;
  likes?: [User['id']];
  date: Date;
}
