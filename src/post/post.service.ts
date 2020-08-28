import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Post } from 'src/types/post';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDTO, UpdatePostDTO } from './post.dto';
import { User } from 'src/types/user';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post') private postModel: Model<Post>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.postModel.find();
  }

  async createPost(postDTO: PostDTO) {
    const post = await this.postModel.create({
      ...postDTO,
    });
    return await post.save();
  }

  async updatePost(id: string, postDTO: UpdatePostDTO): Promise<Post> {
    const post = await this.postModel.findById(id);
    const user = await this.userModel.findById(post.owner);
    console.log(post.owner, postDTO.owner);
    if (postDTO.owner != post.owner) {
      throw new HttpException(
        'You do not own this product',
        HttpStatus.UNAUTHORIZED,
      );
    }
    await post.updateOne(postDTO);
    return post;
  }
  async delete(id: string, userId: string): Promise<Post> {
    const post = await this.postModel.findById(id);
    const user = await this.userModel.findById(post.owner);

    if (userId !== post.owner || user.role != 'ADMIN') {
      throw new HttpException(
        'You do not own this product',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return await post.remove();
  }
  /*async findPostBySeller(userId: string): Promise<Post[]> {
    return await this.postModel
      .find({ owner: userId })
      .populate('owner', '-password');
  }*/
}
