import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    const loggedin = localStorage.getItem('pushpakuserdata');
    if (loggedin) {
      const userdata = JSON.parse(loggedin);
      
      console.log();
      
      if (userdata && userdata.user.isAdmin) {
        // If the user is an admin, allow access to the route
        return true;
      } else {
        // If the user is not an admin, redirect to the home page
        this.router.navigate(['/error']);
        return false;
      }
    }
    
    // If no user is logged in, redirect to the home page
    this.router.navigate(['/error']);
    return false;
  }
}
