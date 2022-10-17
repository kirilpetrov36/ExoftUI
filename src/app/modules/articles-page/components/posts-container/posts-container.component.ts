import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service'
import { Article } from '../../models/article.model';
import { FormControl, FormGroup } from "@angular/forms";
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { filter } from 'rxjs/internal/operators/filter';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-posts-container',
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.scss'],
  providers: [RequestService]
})
export class PostsContainerComponent implements OnInit {

	search = new FormControl('');
	articles!: Article[];
	articlesToShow!: Article[];
	image!: string;
	unsubscribe$ = new Subject<void>;

	constructor(private requestService: RequestService) { }

	ngOnInit(): void {
		this.requestService.getArticles()
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(
				(articles: Article[]) => {
					console.log(articles);
					this.articlesToShow = articles;
					this.articles = articles;
				}
			)

		this.search.valueChanges
			.pipe(
				tap(
					value => {
						if (value == ""){
							this.articlesToShow = this.articles;
						}
					}
				),
				filter(
					value => (value != null && value != "" && value.length > 2)
				),
				takeUntil(this.unsubscribe$),
				debounceTime(1200),
				switchMap(
					inputValue => {
						return this.requestService.searchArticles(inputValue!);
					}
				)
			)
			.subscribe(
				res => this.searchArticles(res)
			);
	}

	ngOnDestroy(): void{
		this.unsubscribe$.next();
		this.unsubscribe$.complete()
	}

	searchArticles(articles: Article[]): void{
		console.log(articles);
		this.articlesToShow = articles;
	}
}