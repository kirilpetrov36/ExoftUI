import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from 'src/app/shared/validators/password.validator';
import { AuthService } from '../../services/auth.service';
import { AuthResponse } from '../../models/auth-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [AuthService]
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  responseError: string;
  responseErrors: string[];

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email, Validators.pattern("[^ @]*@[^ @]*")]),
      password: this.fb.control('', [Validators.required, Validators.maxLength(50), Validators.minLength(8), passwordValidator()])
    });
  }

  submit(): void{
    this.responseError = "";
    this.responseErrors = [];

    this.authService.login({
      email: this.signInForm.value.email,
      password: this.signInForm.value.password
    }).subscribe(
      (authResponse: AuthResponse) =>{
        this.router.navigate(['/']);
      },
      e => {
        console.log(e);
        if (typeof e.error === "string"){
          this.responseError = e.error;
        }
        else if (typeof e.error === "object"){
          this.responseErrors = e.error.errors;
        }         
      }
    );
  }
}
