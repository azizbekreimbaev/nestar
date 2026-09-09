import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway({ transports: ['websocket'], secure: false })
export class SocketGateway {
  private logger: Logger = new Logger("SocketEventGateway")
  private summaryClient: number = 0


  public afterInit(server: Server) {
    this.logger.log(`WevSocket Server Initialized total: ${this.summaryClient}`)
  }

  handleConnection(client: WebSocket, ...args: any[]) {
    this.summaryClient++;
    this.logger.log(`== Client conected total: ${this.summaryClient} ==`)
  }

  handleDisconnect(client: WebSocket) {
    this.summaryClient--;
    this.logger.log(`== Client disconnect left total: ${this.summaryClient} ==`)
  }


  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
