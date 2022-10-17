import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { Article } from 'src/app/modules/articles-page/models/article.model';
import { RequestService } from 'src/app/modules/articles-page/services/request.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

	articles!: Article[];
  	unsubscribe$ = new Subject<void>;

  constructor(private requestService: RequestService) { }

  	ngOnInit(): void {
    	this.requestService.getArticles()
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(
				(articles: Article[]) => {
					this.articles = articles;
				}
			)
  	}

	verify(): void{

	}

}
