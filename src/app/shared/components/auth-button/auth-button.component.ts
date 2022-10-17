import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
	selector: 'app-auth-button',
	templateUrl: './auth-button.component.html',
	styleUrls: ['./auth-button.component.scss']
})
export class AuthButtonComponent implements OnInit {

	avatarUrl: string | null;
	userFirstName: string | null;
	userLastName: string | null;

	constructor(public authService: AuthService) { }

	ngOnInit(): void {
		this.avatarUrl = localStorage.getItem("USER_AVATAR");
		this.userFirstName = localStorage.getItem("USER_FIRST_NAME");
		this.userLastName = localStorage.getItem("USER_LAST_NAME")
		this.authService.checkAuth();
	}

	logout(): void{
		this.authService.logout().subscribe();
	}

}
