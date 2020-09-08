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
import { Post as PostPro } from 'src/types/post';
import { get } from 'http';
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  async createPost(@Body() post: PostDTO): Promise<PostPro> {
    return await this.postService.createPost(post);
  }

  @Get('all')
  async findAllPosts() {
    return await this.postService.findAll();
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return await this.postService.deletePost(id);
  }
  @Get(':owner')
  findPostBySeller(@Param('owner') owner: string) {
    return this.postService.findPostBySeller(owner);
  }

  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() product: UpdatePostDTO,
  // ): Promise<PostPro> {
  //   return await this.postService.updatePost(id, product);
  // }
}
