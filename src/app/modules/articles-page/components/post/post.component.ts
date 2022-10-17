import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Article } from '../../models/article.model';
import { FullArticle } from '../../models/full-article.model';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [RequestService]
})
export class PostComponent implements OnInit {

	article: FullArticle;
	private routeSub!: Subscription;
	isLoggedIn: boolean = !!localStorage.getItem("JWT_TOKEN");
	avatarUrl: string | null;
	canEdit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private route: ActivatedRoute, private requestService: RequestService, private router: Router) { }

	ngOnInit(): void {
		this.routeSub = this.route.params.subscribe(params => {
			this.requestService.getFullArticle(params['id']).subscribe(
				request => {
					this.article = request;
					console.log(this.article);
					this.checkUser(request.user.id);
				}
			)
		});
		
		this.avatarUrl = localStorage.getItem("USER_AVATAR");
	}

	ngOnDestroy() {
		this.routeSub.unsubscribe();
	}

	checkUser(articleUserId: string): void {
		let currentUserId: string | null = localStorage.getItem("USER_ID");

		if (!!currentUserId){
			if (articleUserId === currentUserId){
				this.canEdit$.next(true);
			}
		}
	}

	deleteArticle(): void{
		confirm("Are you sure you wanna delete this ?");
		console.log(this.article.id);
		this.requestService.deleteArticle(this.article.id).subscribe(
			() => {
				this.router.navigate(['/myBlog']);
			}
		);
	}

	editArticle(): void{
		this.router.navigate([`/myBlog/ArticleEditor/Update/${this.article.id}`]);
	}

}
