import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import {TranslateService} from 'ng2-translate';
import 'rxjs/add/operator/map';
declare var $: any; // TODO hide modal in othe way

// Interfaces
import { UserInterface, ResponseDataBase } from '../interfaces/index.interface';

// Services
import { UserService } from "./user.service";
import { ResourceService } from "./resource.service";

@Injectable()
export class AuthService {

  firebaseURL: string;
  databaseURL = 'http://localhost:8080/PatientPortal/';
  alert: string;

  constructor(public router: Router,
    public http: HttpClient,
    public _userService: UserService,
    public _resourceService: ResourceService,
    public translate: TranslateService) {

      this.firebaseURL = this._resourceService.firebaseURL;
    }

  loginFireBaseUser(username, password) {
    let url = this.firebaseURL + '/users.json?orderBy="email"&equalTo="' + username + '"';
    this.http.get(url)
      .subscribe(
        RES => {
          if (!Object.keys(RES).length) {
            this._userService.danger = "The user don't exits, please register it";
          } else {
            delete this._userService.danger;
            if (this._resourceService.selectedFreeslot) {
              this.router.navigate(['/bookappointments']);
            } else {
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


  loginUser(username, password){
    if (username && password) {
      let data = { username, password };
      this.getUserToken(data);


      // obj._loginUser(data, function (RES) {
      //   if (RES.METADATA.STATUS === constants.STATUS.OK) {
      //     $window.localStorage.setItem("token", RES.result[0].token);
      //     obj.getPatientData('', function (RES) {
      //       if (RES.METADATA.STATUS === constants.STATUS.OK) {
      //         $window.sessionStorage.setItem('dataPatient', JSON.stringify(RES.result[0]));
      //         $rootScope.viewDocuments = RES.result[0].viewMedicalDoc;
      //         $rootScope.patient = RES.result[0];
      //         $window.sessionStorage.isLogged = true;
      //         $rootScope.isLogged = $window.sessionStorage.isLogged;
      //         $translate.use($rootScope.patient.language);
      //         if ($state.current.name == "bookappointments") {
      //           $rootScope.viewBook = "book";
      //         } else {
      //           if ($rootScope.patient.role == 'admin') {
      //             $location.path("/admin");
      //           } else {
      //             $location.path("/myappointments");
      //           }
      //         }
      //         $rootScope.loginMessage = '';
      //       } else {
      //         $rootScope.loginMessage = RES.METADATA.ERROR_MESSAGE;

      //       }
      //     });

      //   } else {
      //     $rootScope.loginMessage = RES.METADATA.ERROR_MESSAGE;
      //     if (RES.METADATA.STATUS == constants.STATUS.RESENDACTIVATION) {
      //       $rootScope.showActivation = true;
      //     }
      //   }
      // }, function () {
      //   //handler error in main.js. there is an interceptor.
      // });

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
          localStorage.setItem("token", response.result[0].token);
          this._userService.getPatientData('');
          delete this.alert;
          $('#LoginModal').modal('hide');
        }, err => {
          this.alert = "User and/or password incorrect.";
        }
      );
  }




//   getPatientData (params, success){
//   $http({
//     method: 'GET',
//     params: params,
//     url: "rest/patient"
//   }).success(success)
//     .error(function (response) {
//       console.log(response);
//     });
// }

}
