import { Component } from '@angular/core';
import {TranslateService} from 'ng2-translate';
import { Title } from '@angular/platform-browser';
import { AppSettings } from '../app/appSettings';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  environmentDB = environment.DATABASEURL;

  constructor(public translate: TranslateService,
    private titleService: Title) {

    this.titleService.setTitle(AppSettings.SITETITLE);
    
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

     // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');

    this.changeFavicon(AppSettings.FAVICON);

  }

  changeFavicon(src) {
    var link = document.createElement('link'),
      oldLink = document.getElementById('dynamic-favicon');
    link.id = 'dynamic-favicon';
    link.rel = 'shortcut icon';
    link.href = src;
    if (oldLink) {
      document.head.removeChild(oldLink);
    }
    document.head.appendChild(link);
  }
}
