import { WsJwtGuard } from './../../auth/ws-jwt.guard';
import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
    
import * as cookie from 'cookie';
import { Logger, UseGuards } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { CommentsService } from './comments.service';
import { OnEvent } from '@nestjs/event-emitter';

export type Comment = { message: string; author: string };
    
@WebSocketGateway()
export class SocketCommentsGateway 
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('AppGateway');

    constructor(private readonly commentsService: CommentsService) {}

    @UseGuards(WsJwtGuard)
    @SubscribeMessage('addComment')
    async handleMessage(client: Socket, comment: Comment) {
        const { idNews, message } = comment;
        const userId: number = client.data.user.id;
        const _comment = await this.commentsService.create(idNews, message, userId);
        this.server.to(idNews.toStrimg()).emit('newComment', _comment);
    }

    @OnEvent('comment.remove')
    handleRemoveCommentEvent (payload) {
        const { commentId, newsId } = payload;
        console.log(commentId, newsId);
        this.server
            .to(newsId.toString())
            .emit('editComment', { id: commentId, comment });
    }
    
    afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
   
    handleConnection(client: Socket, ...args: any[]) {
        const { newsId } = client.handshake.query;
        client.join(newsId);
        this.logger.log(`Client connected: ${client.id}`);
    }
}
    