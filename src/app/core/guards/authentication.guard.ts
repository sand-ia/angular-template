import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authenticationService.isAuthenticated()) {
      if (this.authenticationService.isTokenExpired()) {
        this.authenticationService.logout();
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
