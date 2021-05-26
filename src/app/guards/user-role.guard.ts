import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouteConfigLoadEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class UserRoleGuard implements CanActivate {
  
  constructor(
    private auth: AuthService,
  ){}

  async canActivate(route: ActivatedRouteSnapshot){
    const role = await this.auth.getUserRole();
    if(role == route.data.role){
      return true;
    } else {
      return false;
    }
  }
}
