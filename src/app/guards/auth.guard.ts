import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot, // This represents the route being accessed. Provides:
    // - Route params, data, query params, etc.
    // - The path and component being navigated to.
    state: RouterStateSnapshot // Represents the entire router state at the moment
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('token') // If no token found, redirect to login
    if(token) {
      return true
    } else {
      this.router.navigate(['/login']) // Redirects to login
      return false // And make sure we can't activate the route wanted to reach
    }
  }
}
