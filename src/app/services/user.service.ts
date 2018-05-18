import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {TranslateService} from 'ng2-translate';
import 'rxjs/add/operator/map';

// Interfaces
import { UserInterface, ResponseDataBase } from '../interfaces/index.interface';

// Services
import { ResourceService } from "./resource.service";

@Injectable()
export class UserService {
  databaseURL = 'http://localhost:8080/PatientPortal/';
  firebaseURL: string;
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
    this.firebaseURL = this._resourceService.firebaseURL;
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
            console.log(this.user);
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
          this.getPatientAppointments();
        },
        response => {
        },
        () => {
          // Somthing to do when the observable is completed.');
        }
      );
  }

  getPatientAppointments(){
    this.user.appointments = [{ "date": "1/1/2020", "department": "Department 5", "doctorName": "Doctor 5", "hour": "08:40" }, { "date": "1/1/2020", "department": "Department 2", "doctorName": "Doctor 2", "hour": "08:10" }, { "date": "1/1/2020", "department": "Department 1", "doctorName": "Doctor 1", "hour": "08:00" }, { "date": "1/1/2020", "department": "Department 1", "doctorName": "Doctor 1", "hour": "08:00" }, { "date": "1/1/2020", "department": "Department 1", "doctorName": "Doctor 1", "hour": "08:00" }, { "date": "1/1/2020", "department": "Department 3", "doctorName": "Doctor 3", "hour": "08:20" }, { "date": "1/1/2020", "department": "Department 1", "doctorName": "Doctor 1", "hour": "08:00" }, { "date": "1/1/2020", "department": "Department 1", "doctorName": "Doctor 1", "hospital": { "adress": "London", "id": 1, "name": "ARC" }, "hour": "08:00" }, { "date": "1/1/2020", "department": "Department 3", "doctorName": "Doctor 3", "hour": "08:20" }, { "date": "1/1/2020", "department": "Department 1", "doctorName": "Doctor 1", "hospital": { "adress": "London", "id": 1, "name": "ARC" }, "hour": "08:00" }, { "date": "1/1/2020", "department": "Department 3", "doctorName": "Doctor 3", "hour": "08:20" }, { "date": "1/1/2020", "department": "Department 2", "doctorName": "Doctor 2", "hour": "08:10" }, { "date": "1/1/2020", "department": "Department 4", "doctorName": "Doctor 4", "hour": "08:30" }];
  }
  

  getUser(id){
    let url = this.firebaseURL + '/users/' + id + '.json';
    this.http.get(url)
    .subscribe(
      RES => {
        this.user = RES;
        console.log(this.user);
        this.user.id = id;
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
      },
        response => {
      },
        () => {
          // Somthing to do when the observable is completed.');
        }
    );
  }

  chekIfUserExists(email){
    let url = this.firebaseURL + '/users.json?orderBy="email"&equalTo="' + email + '"';
    return this.http.get(url)
      .map(res => {
        delete this.danger;
        delete this.success;
        this.translate.get('THE_USER_ALREADY_REGISTER').subscribe(
          translation => {
            this.warning = translation;
          });
        return res;
      });
  }

  updateUser(user: UserInterface) {
    sessionStorage.setItem('dataPatient', JSON.stringify(this.user));
    let url = this.firebaseURL + 'users/' + this.user.id + '.json';
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
    let url = this.firebaseURL + 'users/' + this.user.id + '.json';
    return this.http.delete(url)
      .map(res => {
        return res;
      });
  }

  doLogout(){
    delete this.user;
  }

  newUser(user: UserInterface){
    let url = this.firebaseURL + 'users.json';
    let body = JSON.stringify(user);
    let headers = new HttpHeaders({
      'Content-Type' : 'aplication/json'
    });

    return this.http.post(url, body, { headers })
      .map(res => {
        delete this.danger;
        delete this.warning;
        this.translate.get('THANKS_FOR_REGISTER').subscribe(
          translation => {
            this.success = translation;
          });
        return res;
      });

  }

  

}
