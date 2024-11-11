import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../service/localstorage.service';  // Import the LocalStorageService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private localStorageService: LocalStorageService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const loggedin = this.localStorageService.getItem('pushpakuserdata');  // Use the localStorage service to get the item
    if (loggedin) {
      const user = loggedin;
      if (user) {
        // If the user is logged in, redirect to the home page (or any other page)
        this.router.navigate(['/']);
        return false; // Prevent access to the login/signup route
      }
    }
    
    // Allow access to the route if not logged in
    return true;
  }
}
