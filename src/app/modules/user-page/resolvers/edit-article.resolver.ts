import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { Article } from "../../articles-page/models/article.model";
import { RequestService } from "../../articles-page/services/request.service";

@Injectable({ providedIn: 'root' })
export class EditArticleResolver implements Resolve<Article> {
  constructor(private requestService: RequestService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    console.log(route.paramMap.get('id')!);
    return this.requestService.getArticle(route.paramMap.get('id')!);
  }
}