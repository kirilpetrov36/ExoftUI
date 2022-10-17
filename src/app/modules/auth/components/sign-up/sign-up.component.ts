import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { RequestService } from 'src/app/modules/articles-page/services/request.service';
import { passwordValidator } from 'src/app/shared/validators/password.validator';

//Services
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [AuthService, RequestService]
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  userSignedUp: boolean = false;
  invalidEmail: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private requestService: RequestService) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: this.fb.control('', [Validators.required, Validators.maxLength(30)]),
      lastName: this.fb.control('', [Validators.required, Validators.maxLength(30)]),
      email: this.fb.control('', [Validators.required, Validators.email, Validators.pattern("[^ @]*@[^ @]*")]),
      password: this.fb.control('', [Validators.required, Validators.maxLength(50), Validators.minLength(8), passwordValidator()])
    });
  }

  submit(): void {
    if (this.signUpForm.dirty && this.signUpForm.valid) {
      console.log('submitted');
      
      this.authService.signUp(
        {
          firstName: this.signUpForm.value.firstName,
          lastName: this.signUpForm.value.lastName,
          email: this.signUpForm.value.email,
          password: this.signUpForm.value.password
        }
      ).subscribe((result) => {
        if (result){
          this.userSignedUp = true;
          this.invalidEmail = false;      
          console.log(result)
        }
        else{
          this.invalidEmail = true;
        }
      });
    }
  }

  makeRequest(): void{
    this.requestService.getArticles().subscribe((res) => {
    });
  }

  get firstNameControl(): FormControl{
    return this.signUpForm.controls['firstName'] as FormControl
  }

  get lastNameControl(): FormControl{
    return this.signUpForm.controls['lastName'] as FormControl
  }

  get emailControl(): FormControl{
    return this.signUpForm.controls['email'] as FormControl
  }

  get passwordControl(): FormControl{
    return this.signUpForm.controls['password'] as FormControl
  }

}
