import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { tap } from 'rxjs/internal/operators/tap';
import { Subject } from 'rxjs/internal/Subject';
import { Article } from 'src/app/modules/articles-page/models/article.model';

import { RequestService } from 'src/app/modules/articles-page/services/request.service';

@Component({
	selector: 'app-article-editor',
	templateUrl: './article-editor.component.html',
	styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit {

	updateArticle: boolean = false;
	articleToUpdate: Article;
	title: string;
	content: string;
	unsubscribe$:Subject<void> = new Subject<void>;
	articleForm: FormGroup;
	file: File;

	constructor(private fb: FormBuilder, private requestService: RequestService, private router: Router, private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.articleForm = this.fb.group({
			title: this.fb.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
			content: this.fb.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(1000)]),
		});

		this.route.data.subscribe(({ editArticle }) => {
			if (editArticle != null){
				this.articleToUpdate = editArticle;
				this.updateArticle = true;
			}	
		})

		console.log(this.articleToUpdate);

	}

	ngOnDestroy(): void{
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	submit(): void{
		if (this.updateArticle){
			console.log("update");
			this.articleToUpdate.title = this.articleForm.value.title;
			this.articleToUpdate.content = this.articleForm.value.content;
			this.requestService.createArticleFile(this.file, this.articleToUpdate.id)
				.pipe(
					takeUntil(this.unsubscribe$),
					tap(
						(file) => {
							console.log(file)
							this.requestService.deleteArticleFile(file.id);
						}
					),
					concatMap(
						image =>{
							return this.requestService.updateArticle(this.articleToUpdate)
							.pipe(
								takeUntil(this.unsubscribe$),
							)
						}
					)
				)
				.subscribe(
					() => {	
						this.router.navigate(['/myBlog'])
					}
				);

		}
		else{
			console.log(this.articleForm.value.title, this.articleForm.value.content);
			this.requestService.createArticle(this.articleForm.value.title, this.articleForm.value.content)
			.pipe(
				filter(article => article != null),
				concatMap(
					newArticle => {
						return this.requestService.createArticleFile(this.file, newArticle.id);
					}
				)
			)				
			.subscribe(
				res =>{
					if (res != null){
						this.router.navigate(['/myBlog']);
					}
				}
			);
		}	
	}

	//retrieve file from fileUpload button
	onFileChanged(event: any) {
		this.file = event.target.files[0]

		

	}

	get titleControl(): FormControl{
		return this.articleForm.controls['title'] as FormControl
	}

	get contentControl(): FormControl{
		return this.articleForm.controls['content'] as FormControl
	}

}

