import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ResourceService {

  firebaseURL = 'https://patient-portal-a6c57.firebaseio.com/';
  selectedFreeslot: any;
  hospitals = [];
  payors = [];
  departments = [];
  doctors = [];
  languages = [];
  roles = [];
  schedules = [];
  configurationsParams = [];
  defaultLanguage;

  constructor(public http: HttpClient) {

    this.getResource('hospitals')
      .subscribe(data => {
        for (var x in data) {
          if (data[x] != null){
            this.hospitals.push(data[x]);
          }  
        }
        console.log(this.hospitals.length);
      });

    this.getResource('payors')
      .subscribe(data => {
        for (var x in data) {
          if (data[x] != null) {
            this.payors.push(data[x]);
          }
        }
      });

    this.getResource('departments')
      .subscribe(data => {
        for (var x in data) {
          if (data[x] != null) {
            this.departments.push(data[x]);
          }
        }
      });

    this.getResource('languages')
      .subscribe(data => {
        for (let x in data) {
          if (data[x] != null) {
            this.languages.push(data[x]);
          }
        }
        this.defaultLanguage = this.languages[0].id;
      });

    this.getResource('roles')
      .subscribe(data => {
        for (let x in data) {
          if (data[x] != null) {
            this.roles.push(data[x]);
          }
        }
      });

    this.getResource('schedules')
      .subscribe(data => {
        for (let x in data) {
          if (data[x] != null) {
            this.schedules.push(data[x]);
          }
        }
      });

   }

   public searchDoctors(departmentId){
    this.doctors = [];
    this.getNodofromResourceId('doctors', 'departments', departmentId)
      .subscribe(data => {
        for (var x in data) {
          if (data[x] != null) {
            this.doctors.push(data[x]);
          }
        }
      });
  }

  getResource(id){
    let url = this.firebaseURL + id + '.json';
    return this.http.get(url)
    .map(res => res);
  }


  getNodofromResourceId(nodo, resource, id){
    let url = this.firebaseURL + resource + '/' + id + '/' + nodo + '.json';
    return this.http.get(url)
      .map(res => res);
  }


  updateResource(typeResource: string, resource: any) {
    let url = this.firebaseURL + typeResource + '.json';
    let body = JSON.stringify(resource);
    let headers = new HttpHeaders({
      'Content-Type': 'aplication/json'
    });
    return this.http.put(url, body, { headers })
      .map(res => {
        return res;
      });
  }

}
