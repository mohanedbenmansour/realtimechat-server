import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/types/message';
import { MessageDTO } from './message.dto';

@Injectable()
export class MessageService {
  constructor(@InjectModel('Message') private MessageModel: Model<Message>) {}

  async createMessage(messageDTO: MessageDTO) {
    const post = await this.MessageModel.create({
      ...messageDTO,
    });
    return await post.save();
  }
  async readMessage(sender: string, receiver: string) {
    return await this.MessageModel.find({ sender: sender, receiver: receiver });
  }
}
