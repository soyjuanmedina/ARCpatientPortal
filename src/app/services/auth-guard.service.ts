import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';

@Injectable()
export class AuthGuardService implements CanActivate {
  
  constructor(public _userService: UserService, 
    public router: Router) { }
  
    canActivate(): boolean {
      if (!this._userService.user) {
        this.router.navigate(['bookappointments']);
      return false;
    }
    return true;
  }
}