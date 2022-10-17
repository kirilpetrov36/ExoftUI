import { Injectable } from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import { AuthService } from "src/app/modules/auth/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate{

    constructor(private router: Router) {}
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{

        console.log(!!localStorage.getItem("IS_ADMIN"));

        if (localStorage.getItem("IS_ADMIN") === "true") {      
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}