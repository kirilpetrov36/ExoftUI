import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router, RoutesRecognized} from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	url: Observable<string>;
	newsPageActivated: boolean = false;
	myBlogPageActivated: boolean = false;
	adminPageActivated: boolean = false;
	isAdmin: boolean = localStorage.getItem("IS_ADMIN") === "true" ? true : false;

  	constructor(private router: Router) { }

  	ngOnInit(): void {

		console.log(this.isAdmin);
		this.router.events.forEach((event) => {
			if(event instanceof NavigationEnd) {

				switch(this.router.url){
					case "/":
						this.deactivateAll();
						this.newsPageActivated = true;
						break;
					case "/myBlog":
						this.deactivateAll();
						this.myBlogPageActivated = true;
						break;
					case "/admin":
						this.deactivateAll();
						this.adminPageActivated = true;
						break;
					default:
						this.deactivateAll();
				}	
			}
			// NavigationEnd
			// NavigationCancel
			// NavigationError
			// RoutesRecognized
		  });
  	}

	deactivateAll(): void{
		this.newsPageActivated = false;
		this.myBlogPageActivated = false;
		this.adminPageActivated = false;
	}

}
