import { getRandomInt } from '../news.service';
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dtos/create-comment-dto';

export type Comment = {
    id?: number;
    message: string;
    author: string;
};

@Injectable()
export class CommentsService {
    private readonly comments = {};

    create(idNews: number, comment: Comment) {
        if (!this.comments[idNews]) {
            this.comments[idNews] = [];
        }

        this.comments[idNews].push({ ...comment, id: getRandomInt() });
        return 'Комментарий был создан';
    }

    edit(idNews: number, idComment: number, comment: CommentEdit) {
        const indexComment =
            this.comments[idNews]?.findIndex((c) => c.id === idComment) === -1;
        if (!this.comments[idNews] || indexComment) {
            return false;
        }

        this.comments[idNews][indexComment] = {
            ...this.comments[idNews][indexComment],
            comment,
        };
        return 'Комментарий был создан';
    }

    find(idNews: number): Comment[] | null {
        return this.comments[idNews] || null;
    }

    async remove(idNews:string, idComment:string): Promise<boolean>{
        const index = this.comments?.[idNews].findIndex((x) => x.id === idComment);
        if (index !== -1) {
            this.comments[idNews].splice(index, 1);
            return true;
        }
        return false;
    }

    async removeAll(idNews:string):Promise<boolean> {
        return delete this.comments?.[idNews];
    }
}