import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean | UrlTree {
        
        let isAuthenticated: any 
        this.authService.userData.subscribe(value=>{
            isAuthenticated = value
        })
        //console.log(isAuthenticated);
        if(!isAuthenticated) {
            alert('You are not allowed to view this page. You are redirected to login Page');
            this.router.navigate(["signin"]);
           // console.log('return url', route.url)
            return false; 
        }

        return true;
    }

}