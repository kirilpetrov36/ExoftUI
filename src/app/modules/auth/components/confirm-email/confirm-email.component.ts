import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { AuthResponse } from '../../models/auth-response.model';
import { AuthService } from '../../services/auth.service';

@Component({
  	selector: 'app-confirm-email',
  	templateUrl: './confirm-email.component.html',
  	styleUrls: ['./confirm-email.component.scss'],
  	providers: [AuthService]
})
export class ConfirmEmailComponent implements OnInit {

	emailConfirmed: boolean = false;
  	token: string;
  	userId: string;

	constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

	ngOnInit(): void {
		this.token = this.route.snapshot.queryParamMap.get('token') ?? "";
		this.userId = this.route.snapshot.queryParamMap.get('userId') ?? "";
		this.confirmEmail();
	}

	confirmEmail(): void{
		if (this.token !== "" && this.userId !== ""){
			this.authService.confirmEmail(this.token, this.userId).subscribe(
				(authResponse: AuthResponse) =>{
					if (authResponse.success){
						this.emailConfirmed = true;
						this.router.navigate(['/']);
					}
				}
			)
		}   
	}
}
