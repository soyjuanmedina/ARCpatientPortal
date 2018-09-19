import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from 'ng2-translate';
import 'rxjs/add/operator/map';

// App Settings
import { AppSettings } from '../appSettings';

// Interfaces
import { ResponseDataBase } from '../interfaces/index.interface';

@Injectable()
export class ResourceService {
  databaseURL = AppSettings.DATABASEURL;
  loading: boolean;
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
  isMobile: boolean = false;

  constructor(public http: HttpClient,
    public translate: TranslateService) {

    this.loading = true;

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
        this.loading = false;
      });
      
      this.getResource('languages')
      .subscribe(data => {
        let response = data as ResponseDataBase;
        this.languages = response.result;
        this.defaultLanguage = this.languages[0].id;
        this.translate.use(this.defaultLanguage);
        this.loading = false;
      });

    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
        this.isMobile = true;
    }
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
  }

  sendMail (content) {
    let url = this.databaseURL + 'rest/resource/sendmail';
    return this.http.put(url, content);
  }
  

}
