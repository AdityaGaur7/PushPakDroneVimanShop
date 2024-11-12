import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../service/localstorage.service';  // Import the LocalStorageService

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private localStorageService: LocalStorageService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    const loggedin = this.localStorageService.getItem('pushpakuserdata');  // Use the localStorage service to get the item
    if (loggedin) {
      const userdata = loggedin;
      // console.log(userdata);
      
      if (userdata && userdata) {
        // If the user is an admin, allow access to the route
        return true;
      } else {
        // If the user is not an admin, redirect to the error page
        this.router.navigate(['/error']);
        return false;
      }
    }
    
    // If no user is logged in, redirect to the error page
    this.router.navigate(['/error']);
    return false;
  }
}
