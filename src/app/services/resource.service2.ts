import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

// Interfaces
import { ResponseDataBase } from '../interfaces/index.interface';

@Injectable()
export class ResourceService {

  databaseURL = 'http://localhost:8080/PatientPortal/';
  firebaseURL = 'https://patient-portal-a6c57.firebaseio.com/';
  selectedFreeslot: any;
  hospitals = [];
  payors = [];
  departments = [];
  doctors = [];
  languages = [];
  languagesDatabase = [];
  roles = [];
  schedules = [];
  configurationsParams = [];
  defaultLanguage;

  resources = ['hospitals', 'departments', 'payors', 'roles', 'schedules'];

  constructor(public http: HttpClient) {

    this.resources.forEach((resource) => {
      this.getFireBaseResource(resource)
        .subscribe(data => {
          for (var x in data) {
            if (data[x] != null) {
              this[resource].push(data[x]);
            }
          }
        });
    });

    this.getResource('languages')
      .subscribe(data => {
        let response = data as ResponseDataBase;
        this.languages = response.result;
        this.defaultLanguage = this.languages[0].id;
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
    let url = this.databaseURL + 'rest/resource/' + id;
    return this.http.get(url);
  }

  getFireBaseResource(resource) {
    let url = this.firebaseURL + resource + '.json';
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
