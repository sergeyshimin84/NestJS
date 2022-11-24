import { Comments } from './comments.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {
    private readonly comments = {
        1: [{
            id: 123,
            message: "Мой первый комментарий",
            author: "Вася",
        }]
    }
    
    find(newsId: string | number): Comment[] | string {
        if (this.comments[newsId]) {
            
            return this.comments[newsId] 
        }
        return 'Комментарии не найдены'
    }

    create(newsId, comment: Comment): Comment {
        const id = getRandomInt(0, 10000) as string | number;

        if(!this.comments[newsId]) {
            this.comments[newsId] = []
        }

        this.comments[newsId].push({id, ...comment})
     
        return 'Комментарий был создан'
    }

    remove(newsId: string | number, commentId: string | number): null | Comment[] {
        if(!this.comments[newsId]) {
            return null
        }

        const indexComment = this.comments[newsId].findIndex(comment => comment.id === commentId)

        if (indexComment === -1) {
            return null
        }

        return this.comments[newsId].splice(indexComment, 1)
    }
}
