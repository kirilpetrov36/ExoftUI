import { articleFile } from './article-file.model'
import { User } from './user.model';

export interface Article{
    id: string,
    title: string,
    content: string,
    likesAmount: number,
    commentsAmount: number,
    isDeleted: boolean,
    isVerified: boolean,
    createdAt: string,
    updatedAt: string,
    createdBy: string,
    updatedBy: string,
    articleFiles: articleFile[]
    user: User;
}