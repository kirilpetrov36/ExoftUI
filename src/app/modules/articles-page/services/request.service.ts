import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Article } from '../models/article.model';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from '../../../../environments/environment';
import { FullArticle } from '../models/full-article.model';
import { articleFile } from '../models/article-file.model';
  
@Injectable()
export class RequestService{
  
    constructor(private http: HttpClient){ }
      
    getArticles(): Observable<Article[]>{
        // return this.http.get<Article[]>(`${environment.apiUrl}/Articles/BySubscription`);
        return this.http.get<Article[]>(`${environment.apiUrl}/Articles`);
    }

    getFullArticle(articleId : string): Observable<FullArticle>{
        return this.http.get<FullArticle>(`${environment.apiUrl}/FullArticle/${articleId}`);
    }

    getArticle(articleId: string): Observable<Article>{
        return this.http.get<Article>(`${environment.apiUrl}/Article/${articleId}`);
    }

    searchArticles(searchInput: string): Observable<Article[]>{
        return this.http.get<Article[]>(`${environment.apiUrl}/SearchArticle/${searchInput}`);
    }

    getUserArticles(userId: string): Observable<Article[]>{
        return this.http.get<Article[]>(`${environment.apiUrl}/Articles/User/${userId}`);
    }

    createArticle(title: string, content: string): Observable<Article>{
        return this.http.post<Article>(`${environment.apiUrl}/Article`, {"title": title, "content": content});
    }

    updateArticle(article: Article): Observable<Article>{
        return this.http.put<Article>(`${environment.apiUrl}/Article/${article.id}`, article);
    }

    createArticleFile(file: File, articleId: string): Observable<articleFile>{
        const formData = new FormData();
        formData.append("file", file, file.name); 
        return this.http.post<articleFile>(`${environment.apiUrl}/ArticleFile/${articleId}`, formData);
    }

    deleteArticleFile(fileId: string){
        return this.http.delete(`${environment.apiUrl}/ArticleFile/${fileId}`);
    }

    deleteArticle(articleId: string) {
        return this.http.delete(`${environment.apiUrl}/Article/${articleId}`);
    }
}