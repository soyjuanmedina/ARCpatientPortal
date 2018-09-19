import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../../appSettings';

// Services
import { ResourceService } from '../../../services/index.service';

// Interfaces
import { ResponseDataBase } from '../../../interfaces/index.interface';

//Constants
import { AppConstants } from '../../../appConstants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  NAME = AppSettings.NAME;
  ADDRESS = AppSettings.ADDRESS;
  PHONE = AppSettings.PHONE;
  EMAIL = AppSettings.EMAIL;
  stringPhone = "tel:" + AppSettings.PHONE;

  contactForm = {
    contactFormMail: null,
    contactFormMessage: null,
  }

  alertOk: string;
  alertError: string;
  sending: string = 'SENDING';
  loading: boolean;
  

  constructor(public _resourceService: ResourceService) { }

  validateEmail(email) {
    var pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
    if (pattern.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  sendMail() {
    delete this.alertOk;
    delete this.alertError;
    this.loading = true;
    if (this.validateEmail(this.contactForm.contactFormMail)){
      this._resourceService.sendMail(this.contactForm).subscribe(data => {
        let response = data as ResponseDataBase;
        if (response.METADATA.STATUS == AppConstants.STATUS.OK) {
          this.alertOk = 'THANKS_FOR_CONTACTING';
          this.loading = false;
        } else {
          this.alertError = response.METADATA.ERROR_MESSAGE;
          this.loading = false;
        }
      });
    } else {
      this.alertError = 'PLEASE_REVIEW_YOUR_EMAIL';
      this.loading = false;
    }
}

}
