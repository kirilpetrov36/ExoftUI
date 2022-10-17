import { Component, Input, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { Article } from 'src/app/modules/articles-page/models/article.model';
import { RequestService } from 'src/app/modules/articles-page/services/request.service';

@Component({
	selector: 'app-admin-post',
	templateUrl: './admin-post.component.html',
	styleUrls: ['./admin-post.component.scss']
})
export class AdminPostComponent implements OnInit {

	@Input() article: Article;
	unsubscribe$ = new Subject<void>;

	constructor(private requestService: RequestService) { }

	ngOnInit(): void {
	}

	verify(): void{
		this.article.isVerified = true;
		
		this.requestService.updateArticle(this.article)
			.pipe(
				takeUntil(this.unsubscribe$)
			)
			.subscribe()
	}

	unVerify(): void{
		this.article.isVerified = false;
		
		this.requestService.updateArticle(this.article)
			.pipe(
				takeUntil(this.unsubscribe$)
			)
			.subscribe()
	}

}
