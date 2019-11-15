import {
  Controller,
  Get,
  Res,
  Request,
  Post,
  Body,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostService } from './post.service';
import { PostDTO } from '../dto/post.dto';

@Controller('api')
export class PostController {
  constructor(private postService: PostService) {}

  // Retrieve post list
  @Get('posts')
  async getAllPost(@Res() res) {
    const posts = await this.postService.getAllPost();
    return res.status(HttpStatus.OK).json(posts);
  }

  // add a post
  @UseGuards(AuthGuard())
  @Post('post')
  async addPost(@Res() res, @Request() req, @Body() postDTO: PostDTO) {
    const post = await this.postService.addPost(req.user.userId, postDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been created successfully',
      post,
    });
  }
}
