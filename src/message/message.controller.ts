import { Controller, Get, Body } from '@nestjs/common';
import { MessageService } from './Message.service';
import { send } from 'process';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}
  @Get()
  readMessage(@Body() sender: string, @Body() receiver: string) {
    return this.messageService.readMessage(sender, receiver);
  }
}
