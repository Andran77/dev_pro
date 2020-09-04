import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!localStorage.getItem('token') || localStorage.getItem('token') !== 'test123456') {
      this.router.navigate(['login'])
      return false
    } else if (state.url.includes('login') && localStorage.getItem('token') === 'test123456') {
      this.router.navigate(['home'])
    }
    return true;
  }
}
