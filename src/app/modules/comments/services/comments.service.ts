import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommentsService {
    
  constructor(private httpClient: HttpClient) {}

    getComments(): Observable<Comment[]> {
        return this.httpClient.get<Comment[]>('http://localhost:3000/comments');
    }

    createComment(text: string, parentId: string | null = null): Observable<Comment> {
        return this.httpClient.post<Comment>('http://localhost:3000/comments',
        {
            body: text,
            parentId,
            // Should not be set here
            createdAt: new Date().toISOString(),
            userId: '1',
            username: 'John',
        });
    }

    updateComment(id: string, text: string): Observable<Comment> {
        return this.httpClient.patch<Comment>(`http://localhost:3000/comments/${id}`,
        {
            body: text,
        });
    }

    deleteComment(id: string): Observable<{}> {
        return this.httpClient.delete(`http://localhost:3000/comments/${id}`);
    }
}