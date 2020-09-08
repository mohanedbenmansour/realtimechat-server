import {
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class MessagesGateway {
  // private logger: Logger = new Logger('AppGateway');
  private wss: Server;
  private msg: any;
  constructor() {}
  // handleConnection(client: Socket) {
  //   client.emit('chat', this.msg);

  //   this.logger.log(`client Connected ${client.id}`);
  // }
  // handleDisconnect(client: Socket) {
  //   this.logger.log(`client disconnected ${client.id}`);
  // }
  @WebSocketServer() server: Server;
  @SubscribeMessage('chat')
  handleMessage(client: Socket, data: any) {
    this.msg = data;
    this.server.emit('chat', data);
    return 'hello';
  }
  @SubscribeMessage('typing')
  handleMessage2(client: Socket, data: any) {
    this.server.emit('typing', data);
  }
}
