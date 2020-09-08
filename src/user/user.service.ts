import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../types/user';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDTO, LoginDTO } from 'src/auth/auth.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from 'src/types/payload';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  private sanitizeUser(user: User) {
    return user.depopulate('password');
  }

  async create(UserDTO: RegisterDTO) {
    const { email } = UserDTO;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    const createdUser = new this.userModel(UserDTO);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async findByLogin(UserDTO: LoginDTO) {
    const { email, password } = UserDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }

  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }
  async findUserById(id: string) {
    return await this.userModel.findById(id).exec();
  }
  async addFriend(UserId: string, id: string) {
    const conditions = {
      _id: UserId,
      friends: { $ne: id },
    };

    const update = {
      $push: { friends: id },
    };
    const conditions2 = {
      _id: id,
      friends: { $ne: UserId },
    };

    const update2 = {
      $push: { friends: UserId },
    };
    try {
      const user = await this.userModel.findOneAndUpdate(conditions, update);
      const user2 = await this.userModel.findOneAndUpdate(conditions2, update2);

      return user;
    } catch (err) {
      console.log(err);
    }
  }
  async getFriends(id: string) {
    const users = await this.userModel.find(
      {
        _id: id,
      },
      {
        friends: 1,
        _id: 0,
      },
    );
    return users;
  }
  async getAllUsers() {
    const users = await this.userModel.find({});
    return users;
  }
  async deleteUser(id: string) {
    const user = await this.userModel.findOneAndRemove({ _id: id });
    return user;
  }
}
