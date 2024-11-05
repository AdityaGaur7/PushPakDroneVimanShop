import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    const loggedin = localStorage.getItem('pushpakuserdata');
    if (loggedin) {
      const user = JSON.parse(loggedin);
      if (user) {
        // If the user is an admin, redirect to the admin dashboard or any other page
        this.router.navigate(['/']);
        return false; // Prevent access to the current route (e.g., login/signup)
      }
    }
    
    return true; // Allow access if not admin
  }
}
