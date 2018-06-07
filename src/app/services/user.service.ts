import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {TranslateService} from 'ng2-translate';
import 'rxjs/add/operator/map';

// App Settings
import { AppSettings } from '../appSettings';

// App Constants
import { AppConstants } from '../appConstants';

// Interfaces
import { UserInterface, ResponseDataBase } from '../interfaces/index.interface';

// Services
import { ResourceService } from "./resource.service";

@Injectable()
export class UserService {
  databaseURL = AppSettings.DATABASEURL;
  user: any;
  danger: string;
  warning: string;
  success: string;
  token: string;

  constructor(public router: Router,
    public http: HttpClient,
    public translate: TranslateService,
    public _resourceService: ResourceService) {
    if (typeof sessionStorage.dataPatient !== 'undefined') {
      this.user = JSON.parse(sessionStorage.getItem('dataPatient'));
    }
  }

  getPatientData(params) {
    this.http.get(this.databaseURL + 'rest/patient', params)
      .subscribe(
        RES => {
          if (!Object.keys(RES).length) {
            this.danger = "The user don't exits, please register it";
          } else {
            delete this.danger;
            if (this._resourceService.selectedFreeslot) {
              this.router.navigate(['/bookappointments']);
            } else {
              this.router.navigate(['/myappointments']);
            }
            this.user = Object.values(RES)[0][0];
            sessionStorage.setItem('dataPatient', JSON.stringify(this.user));
            if (!this.user.appointments) {
              this.user.appointments = [];
            }
            sessionStorage.setItem('dataPatient', JSON.stringify(this.user));
            this.translate.use(this.user.language);
            if (this.user.role == '2') {
              this.router.navigate(['/admin']);
            }
            if (this.user.status == '0') {
              this.router.navigate(['/bookappointments']);
            }
          }
          this.user.appointments = AppConstants.DUMMYSLOTS;
          this.getPatientAppointments().subscribe(data => {
          });
        },
        response => {
        },
        () => {
          // Somthing to do when the observable is completed.');
        }
      );
  }

  getPatientAppointments() {
    let url = this.databaseURL + 'rest/patient/appoiments';
    return this.http.post(url, '');
  }

  updateUser(user: UserInterface) {
    sessionStorage.setItem('dataPatient', JSON.stringify(this.user));
    let url = this.databaseURL + 'users/' + this.user.id + '.json';
    let body = JSON.stringify(user);
    let headers = new HttpHeaders({
      'Content-Type': 'aplication/json'
    });
    return this.http.put(url, body, { headers })
      .map(res => {
        return res;
      });
  }

  deleteUser(user: UserInterface) {
    let params = {
      data: ''
    };
    let url = this.databaseURL + 'rest/user/removeuser';
    return this.http.post(url, params)
      .map(res => {
        return res;
      });
  }

  doLogout(){
    delete this.user;
  }

  registerUser(params){
    let url = this.databaseURL + 'rest/user/registeruser';
    return this.http.post(url, params)
  }

  changeUserMail(params) {
    let url = this.databaseURL + 'rest/user/updateemail';
    return this.http.post(url, params)
  }

  changeUserPass(params) {
    let url = this.databaseURL + 'rest/user/updatepassword';
    return this.http.post(url, params)
  }

  

}
