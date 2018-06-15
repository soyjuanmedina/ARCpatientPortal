import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import {TranslateService} from 'ng2-translate';
import 'rxjs/add/operator/map';
declare var $: any; // TODO hide modal in othe way

// Settings
import { AppSettings } from '../appSettings';

// Constants
import { AppConstants } from '../appConstants';

// Interfaces
import { UserInterface, ResponseDataBase } from '../interfaces/index.interface';

// Services
import { UserService } from "./user.service";
import { ResourceService } from "./resource.service";

@Injectable()
export class AuthService {

  databaseURL = AppSettings.DATABASEURL;
  alert: string;

  constructor(public router: Router,
    public http: HttpClient,
    public _userService: UserService,
    public _resourceService: ResourceService,
    public translate: TranslateService) {

    }

  loginUser(username, password){
    if (username && password) {
      let data = { username, password };
      this.getUserToken(data);

    } else {
     this.alert = "Please fill your email and password.";
    }
    
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/bookappointments']);
    delete this._resourceService.selectedFreeslot;
    this._userService.doLogout();
    this.translate.use(this._resourceService.defaultLanguage);
  }

  getUserToken(data){
    this.http.post(this.databaseURL + 'rest/user/login', data)
      .subscribe(
        RES => {
          let response = RES as ResponseDataBase;
          if(response.METADATA.STATUS == AppConstants.STATUS.OK){
            sessionStorage.setItem("token", response.result[0].token);
            this._userService.getPatientData('');
            delete this.alert;
            $('#LoginModal').modal('hide');
          } else if (response.METADATA.STATUS == AppConstants.STATUS.RESENDACTIVATION)  {
            this.alert = "Please confirm your mail from the email we have sent you before accessing the portal.";
          }
        }, err => {
          this.alert = "User and/or password incorrect.";
        }
      );
  }

}
