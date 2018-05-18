import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import {TranslateService} from 'ng2-translate';
import 'rxjs/add/operator/map';

// Interfaces
import { UserInterface } from '../interfaces/index.interface';

// Services
import { UserService } from "./user.service";
import { ResourceService } from "./resource.service";

@Injectable()
export class AuthService {

  firebaseURL: string;
  databaseURL = 'http://localhost:8080/PatientPortal/';

  constructor(public router: Router,
    public http: HttpClient,
    public _userService: UserService,
    public _resourceService: ResourceService,
    public translate: TranslateService) { 
    this.firebaseURL = this._resourceService.firebaseURL;
    }

  loginUser(username, password){
    var data = {
      password: password,
      username: username
    };

    this.setUserData('login', data);

    let url = this.firebaseURL + '/users.json?orderBy="email"&equalTo="' + username + '"';
    this.http.get(url)
      .subscribe(
      RES => {
        if (!Object.keys(RES).length){
          this._userService.danger = "The user don't exits, please register it";
        } else{
          delete this._userService.danger;
          if (this._resourceService.selectedFreeslot){
            this.router.navigate(['/bookappointments']);
          } else{
            this.router.navigate(['/myappointments']);
          }
          sessionStorage.setItem('dataPatient', JSON.stringify(RES[Object.keys(RES)[0]]));
          let userId = Object.keys(RES)[0];
          this._userService.getUser(userId);
        }
      },
      response => {
      },
      () => {
        // Somthing to do when the observable is completed.');
      }
    );
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/bookappointments']);
    delete this._resourceService.selectedFreeslot;
    this._userService.doLogout();
    this.translate.use(this._resourceService.defaultLanguage);
  }

  setUserData (action, data){
    console.log(data);
    data = {
        "password": "demo1x103",
        "username": "joseantonio.cardin@commonms.com"
    }
    this.http.post(this.databaseURL + 'rest/user/' + action, data)
      .subscribe(
        res => {
          // success
          console.log("Todo ok");
        },
        err => {
          // error
          console.log("Error occured");
        }
      );



    // $http({
    //   method: 'POST',
    //   data: data,
    //   url: "rest/user/" + action
    // }).success(success)
    //   .error(error);
  }

}
