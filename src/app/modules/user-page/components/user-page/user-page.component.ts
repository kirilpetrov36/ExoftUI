import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { Article } from 'src/app/modules/articles-page/models/article.model';
import { RequestService } from 'src/app/modules/articles-page/services/request.service';

@Component({
	selector: 'app-user-page',
	templateUrl: './user-page.component.html',
	styleUrls: ['./user-page.component.scss'],
	providers: [RequestService]
})
export class UserPageComponent implements OnInit {

  	articles: Article[];
	noArticles: boolean;
	unsubscribe$ : Subject<void> = new Subject<void>;

  	constructor(private requestService: RequestService) { }

  	ngOnInit(): void {
		if (!!localStorage.getItem('USER_ID')){
			this.requestService.getUserArticles(localStorage.getItem('USER_ID')!)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(
				(articles: Article[]) => {
					this.articles = articles;
					if (articles.length === 0){
						this.noArticles = true;
					}
				}
			)
		}
  	}

	ngOnDestroy(): void{
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

}
