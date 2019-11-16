import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../interfaces/post.interface';
import { Coment } from '../interfaces/post.interface';
import { User } from '../interfaces/user.interface';
import { PostDTO } from '../dto/post.dto';
import { ComentDTO } from '../dto/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<Post>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  // fetch all post
  async getAllPost(): Promise<Post[]> {
    const posts = await this.postModel.find().exec();
    return posts;
  }

  //add post
  async addPost(userId: string, createPostDTO: PostDTO): Promise<Post> {
    createPostDTO.user = userId;
    const newPost = await this.postModel(createPostDTO);
    return newPost.save();
  }

  // delete post
  async deletePost(postId: string): Promise<any> {
    const deletedPost = await this.postModel.findByIdAndRemove(postId);
    return deletedPost;
  }

  // update post
  async updatePost(postId: string, updatePostDTO: PostDTO): Promise<Post> {
    const updateddPost = await this.postModel.findByIdAndUpdate(
      postId,
      updatePostDTO,
      { new: true },
    );
    return updateddPost;
  }

  // comment a post
  async addComent(
    userId: any,
    postId: string,
    createComentDTO: ComentDTO,
  ): Promise<Post> {
    const user = await this.userModel.findById(userId.userId);
    const post = await this.postModel.findById(postId);
    const newComent = {
      user: userId.userId,
      name: user.name,
      avatar: user.avatar,
      text: createComentDTO.text,
    };
    if (!post) return null;
    post.coments.push(newComent);
    await post.save();
    return post;
  }
}
