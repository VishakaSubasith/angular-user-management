import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate{

  constructor(private router: Router,) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{

    if (sessionStorage.getItem("userId")){
      console.log("sessionStorage.getItem()====>>",sessionStorage.getItem("userId"))
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }

  }
}
