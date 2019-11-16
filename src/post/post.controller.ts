import {
  Controller,
  Get,
  Res,
  Request,
  Post,
  Body,
  HttpStatus,
  UseGuards,
  Param,
  Delete,
  NotFoundException,
  Put,
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

  @UseGuards(AuthGuard())
  @Delete('/post/:postId')
  async deletePost(@Res() res, @Param('postId') postId) {
    const deletedPost = this.postService.deletePost(postId);
    if (!deletedPost) throw new NotFoundException('Post does not exist');

    res
      .status(HttpStatus.OK)
      .json({ message: 'Post has been deleted', deletedPost });
  }

  @UseGuards(AuthGuard())
  @Put('post/:postId')
  async updatePost(
    @Res() res,
    @Param('postId') postId,
    @Body() postDTO: PostDTO,
  ) {
    const updatedPost = await this.postService.updatePost(postId, postDTO);

    if (!updatedPost) throw new NotFoundException('Post does not exist');

    res
      .status(HttpStatus.OK)
      .json({ message: 'Post has been update', updatedPost });
  }

  @UseGuards(AuthGuard())
  @Put('post/:postId/coment')
  async addComent(
    @Param('postId') postId,
    @Body() postDTO: PostDTO,
    @Res() res,
    @Request() req,
  ) {
    const post = await this.postService.addComent(req.user, postId, postDTO);

    if (!post) throw new NotFoundException('Post does not exist');

    res.status(HttpStatus.OK).json(post);
  }
}
