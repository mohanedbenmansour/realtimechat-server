import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDTO, UpdatePostDTO } from './post.dto';
import { User } from 'src/types/user';
import { Post as PostPro } from 'src/types/post';
import { User as UserDec } from 'src/user/utilities/user.decorator';
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getPostsBySeller() {
    return this.postService.findAll();
  }

  @Post()
  async createPost(@Body() post: PostDTO): Promise<PostPro> {
    console.log(post);
    return await this.postService.createPost(post);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Body() userId: string,
  ): Promise<PostPro> {
    return await this.postService.delete(id, userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() product: UpdatePostDTO,
  ): Promise<PostPro> {
    return await this.postService.updatePost(id, product);
  }

  @Get()
  async GetAllPosts() {
    return await this.postService.findAll();
  }
}
