import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'ws';
import * as WebSocket from "ws"
import { AuthService } from '../components/auth/auth.service';
import { Member } from '../libs/dto/member/member';
import * as url from 'url'
import { link } from 'fs';

interface MessagePayload {
  event: string;
  text: string;
  memberData: Member | null
}

interface InfoPayload {
  event: string;
  totalClients: number;
  memberData: Member | null;
  action: string
}


@WebSocketGateway({ transports: ['websocket'], secure: false })
export class SocketGateway {
  private logger: Logger = new Logger("SocketEventGateway")
  private summaryClient: number = 0

  private clientsAuthMap = new Map<WebSocket, Member | null>()
  private messagesList: MessagePayload[] = []


  constructor(private authService: AuthService) { }

  @WebSocketServer()
  server!: Server;


  public afterInit(server: Server) {
    this.logger.verbose(`WevSocket Server Initialized && total: [${this.summaryClient}]`)
  }


  private async retrieveAuth(req: any): Promise<Member | null> {
    try {
      const parseUrl = url.parse(req.url, true)
      const { token } = parseUrl.query
      // console.log("token", token)

      return await this.authService.verifyAuth(token as string)
    } catch (err) {
      return null
    }
  }


  public async handleConnection(client: WebSocket, req: any[]) {

    const authMember = await this.retrieveAuth(req)
    console.log("authMember", authMember)

    //key object boladi ==? Map complex data type uchun
    this.clientsAuthMap.set(client, authMember)
    const clientNick: string = authMember?.memberNick ?? "Guest"

    this.summaryClient++;

    this.logger.verbose(`Connection [${clientNick}]&& total: [${this.summaryClient}]`)

    const infoMsg: InfoPayload = {
      event: "info",
      totalClients: this.summaryClient,
      memberData: authMember,
      action: 'joined'
    }

    this.emitMessage(infoMsg)

    //CLIENT Messags

    client.send(JSON.stringify({ event: 'getMessags', list: this.messagesList }))

  }

  public async handleDisconnect(client: WebSocket) {

    const authMember = this.clientsAuthMap.get(client)

    this.clientsAuthMap.delete(client)

    const clientNick: string = authMember?.memberNick ?? "Guest"

    this.summaryClient--;
    this.logger.verbose(`DisConnection [${clientNick}] && total: [${this.summaryClient}]`)

    const infoMsg: InfoPayload = {
      event: "info",
      totalClients: this.summaryClient,
      memberData: authMember ?? null,
      action: 'left'
    }

    //client chiqib ketgan user boladi

    this.broadcastMessage(client, infoMsg)
  }


  @SubscribeMessage('message')
  public async handleMessage(client: any, payload: string): Promise<void> {

    const authMember = this.clientsAuthMap.get(client)

    const newMessage: MessagePayload = {
      event: "message",
      text: payload,
      memberData: authMember ?? null
    }

    const clientNick: string = authMember?.memberNick ?? "Guest"

    this.logger.verbose(`NEW MESSAGE [${clientNick}]: ${payload}`)

    //yango ulangan userga tepadagi bir nechta 5ta yoki barcha mssagelarni korsatish mantiq
    this.messagesList.push(newMessage)
    if (this.messagesList.length > 5) this.messagesList.splice(0, this.messagesList.length - 5)


    this.emitMessage(newMessage)

  }



  private broadcastMessage(sender: WebSocket, message: InfoPayload | MessagePayload) {
    this.server.clients.forEach((client) => {
      if (client !== sender && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message))
      }
    })
  }


  private emitMessage(message: InfoPayload | MessagePayload) {
    this.server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message))
      }
    })
  }
}


/*
Client faqat oziga  ==> client.send(JSON.stringify({ event: 'getMessags', list: this.messagesList })) 

broadcast cliendan tashqari hammaga ==>   this.broadcastMessage(client, infoMsg)

Emit barcha clientga serverda mavjud ==>    this.emitMessage(newMessage) 
*/