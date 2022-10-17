import { articleFile } from './article-file.model'
import { User } from './user.model';

export interface FullArticle{
    id: string,
    title: string,
    content: string,
    likes: number,
    comments: number,
    isDeleted: boolean,
    isVerified: boolean,
    createdAt: string,
    updatedAt: string,
    createdBy: string,
    updatedBy: string,
    articleFiles: articleFile[]
    user: User;
}