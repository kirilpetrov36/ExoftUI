import { Injectable } from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import { AuthService } from "src/app/modules/auth/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class SharedGuard implements CanActivate{

    constructor(private authService: AuthService, private router: Router) {}
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{

        if (this.authService.isLoggedIn()) {         
            return true;
          } else {
            confirm('You need to be authorized');
            this.router.navigate(['/auth/sign-in']);
            return false;
          }
    }
}