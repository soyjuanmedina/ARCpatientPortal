import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

// App Settings
import { AppSettings } from '../appSettings';

// Interfaces
import { ResponseDataBase } from '../interfaces/index.interface';

@Injectable()
export class ResourceService {

  databaseURL = AppSettings.DATABASEURL;
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
        let response = data as ResponseDataBase;
        this.hospitals = response.result;
        if (this.hospitals.length == 1){
          let params = {
            hospitalId: this.hospitals[0].id,
          };
          this.getResourceWithParams('departments', params).subscribe(data => {
            let response = data as ResponseDataBase;
            this.departments = response.result;
          });
        }
      });
      
      this.getResource('languages')
      .subscribe(data => {
        let response = data as ResponseDataBase;
        this.languages = response.result;
        this.defaultLanguage = this.languages[0].id;
      });
   }

  getResourceWithParams(resource, params) {
    let url = this.databaseURL + 'rest/resource/' + resource;
    return this.http.get(url, { params: params })
  }
  
  getResource(id){
    let url = this.databaseURL + 'rest/resource/' + id;
    return this.http.get(url);
  }

  updateResource(typeResource: string, resource: any) {
    console.log(typeResource, resource);
  }

}
