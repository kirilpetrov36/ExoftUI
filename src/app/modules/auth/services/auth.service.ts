import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { AuthResponse } from '../models/auth-response.model';
import { SignUpBody } from '../models/sign-up-body.model';
import { LoginBody } from '../models/login-body.model';
import { RefreshResponse } from '../models/refresh-response.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LogoutResponse } from '../models/logout-response.model';
  
@Injectable()
export class AuthService{

    private readonly JWT_TOKEN = "JWT_TOKEN";
    private readonly REFRESH_TOKEN = "REFRESH_TOKEN";
    private readonly USER_ID = "USER_ID";
    private readonly USER_AVATAR = "USER_AVATAR";
    private readonly USER_FIRST_NAME = "USER_FIRST_NAME";
    private readonly USER_LAST_NAME = "USER_LAST_NAME";
    private readonly IS_ADMIN = "IS_ADMIN";

    private isAuthenticatedSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isAuthenticatedObs$: Observable<boolean> = this.isAuthenticatedSubject$.asObservable();
  
    constructor(private http: HttpClient){ }
      
    login(loginBody: LoginBody): Observable<AuthResponse>{
        return this.http.post<AuthResponse>(`${environment.apiUrl}/Account/login`, loginBody).pipe(
            tap(
                response => {
                    this.storeUserData(response.token, 
                                        response.refreshToken, 
                                        response.userId, 
                                        response.avatarUrl,
                                        response.userFirstName,
                                        response.userLastName,
                                        response.isAdmin);
                    this.isAuthenticatedSubject$.next(true);
                }
            )
        );
    }

    logout(): Observable<LogoutResponse> {
        return this.http.post<LogoutResponse>(`${environment.apiUrl}/Account/logout`, 
        {'UserId': localStorage.getItem(this.USER_ID), 'RefreshToken': this.getRefreshToken()}
        ).pipe(
            tap(
                (res) => {
                    console.log(res);
                    if (res.success){
                        this.removeUserData();
                        this.isAuthenticatedSubject$.next(false);
                    }       
                }
            )
        )
    }

    signUp(signUpBody: SignUpBody): Observable<boolean>{
        return this.http.post<boolean>(`${environment.apiUrl}/Account/register`, signUpBody);
    }

    confirmEmail(emailConfirmationtoken: string, userId: string): Observable<AuthResponse>{
        return this.http.post<AuthResponse>(`${environment.apiUrl}/Account/confirm-email`, {"Token": emailConfirmationtoken, "UserId": userId}).pipe(
            tap(
                authResponse => {
                    this.storeUserData(authResponse.token, 
                                        authResponse.refreshToken, 
                                        authResponse.userId, 
                                        authResponse.avatarUrl,
                                        authResponse.userFirstName,
                                        authResponse.userLastName,
                                        authResponse.isAdmin);
                    this.isAuthenticatedSubject$.next(true);
                }
            )
        );
    }

    isLoggedIn(): boolean {
        return !!this.getJwtToken();
    }
    
    refreshToken(): Observable<RefreshResponse> {
        return this.http.post<RefreshResponse>(`${environment.apiUrl}/Account/refreshJwt`,
        {'userId': localStorage.getItem(this.USER_ID), 'RefreshToken': this.getRefreshToken()}).pipe(
            tap(
                refreshResponse => {
                    this.storeJwtToken(refreshResponse.token);
                }
            )
        );
    }

    checkAuth(): void{
        if (this.isLoggedIn()){
            this.isAuthenticatedSubject$.next(true);
        }
        else{
            this.isAuthenticatedSubject$.next(false);
        }
    }
    
    getJwtToken(): string {
        return localStorage.getItem(this.JWT_TOKEN)!;
    }
    
    private getRefreshToken(): string {
        return localStorage.getItem(this.REFRESH_TOKEN)!;
    }
    
    private storeJwtToken(jwtToken: string): void {
        localStorage.setItem(this.JWT_TOKEN, jwtToken);
    }
    
    private storeUserData(jwtToken: string, refreshToken: string, userId: string, avatarUrl: string | null, firstName: string, lastName: string, isAdmin: boolean): void {
        localStorage.setItem(this.JWT_TOKEN, jwtToken);
        localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
        localStorage.setItem(this.USER_ID, userId);
        localStorage.setItem(this.USER_FIRST_NAME, firstName);
        localStorage.setItem(this.USER_LAST_NAME, lastName);
        localStorage.setItem(this.IS_ADMIN, isAdmin.toString());

        if (!!avatarUrl){
            localStorage.setItem(this.USER_AVATAR, avatarUrl);
        }
        else{
            localStorage.setItem(this.USER_AVATAR, "../../../../assets/images/icons/user.png");
        }
    }
    
    private removeUserData(): void {
        localStorage.removeItem(this.JWT_TOKEN);
        localStorage.removeItem(this.REFRESH_TOKEN);
        localStorage.removeItem(this.USER_ID);
        localStorage.removeItem(this.USER_AVATAR);
        localStorage.removeItem(this.USER_FIRST_NAME);
        localStorage.removeItem(this.USER_LAST_NAME);
        localStorage.removeItem(this.IS_ADMIN);
    }
}