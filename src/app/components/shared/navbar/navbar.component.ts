import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettings } from '../../../appSettings';
import {TranslateService} from 'ng2-translate';
declare var $:any; // TODO hide modal in othe way

// Services
import { UserService,
  AuthService,
  ResourceService } from "../../../services/index.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  login: any = {
    username: null,
    password: null,
  };


  LOGO = AppSettings.LOGO;
  alert: string;

  constructor(public router: Router,
    public _userService: UserService,
    public _authService: AuthService,
    public _resourceService: ResourceService,
    public translate: TranslateService) {
  }

  ngOnInit() {
    delete this._userService.danger;
    delete this._userService.warning;
    delete this._userService.success;
  }


  doLogin() {
    this._authService.loginUser(this.login.username, this.login.password);
      if (this._resourceService.selectedFreeslot){
        $('#FreeSlotModal').modal('show');
      }
  }

  logout() {
    this._authService.logout();
  }

  changeLanguage(lang){
    this.translate.use(lang);
  }

}
