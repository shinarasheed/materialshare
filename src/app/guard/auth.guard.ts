import {Injectable, OnInit} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate{
    authStatus;
    constructor(private _router: Router){
      
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
        //If user is available at the localStorage and user authStatus is 200, user logged in so return true
        if(localStorage.getItem('user')){
            return true;
        }  
        //remove user from localStorage since the is not authenticated backend and redirect user
        localStorage.removeItem('user');
        this._router.navigate(['/index']);
        return false;  
    }
} 