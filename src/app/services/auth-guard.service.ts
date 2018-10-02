import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { UsersService } from '../blog/services/users.service';
import { isFormattedError } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService, private router: Router, private usersService: UsersService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if(this.usersService.isLogged) return true;
    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }

}
