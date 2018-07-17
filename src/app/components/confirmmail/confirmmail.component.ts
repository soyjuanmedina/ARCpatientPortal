import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { UserService } from "../../services/index.service";

// Interfaces
import { ResponseDataBase } from '../../interfaces/index.interface';

// Constants
import { AppConstants } from '../../appConstants';

@Component({
  selector: 'app-confirmmail',
  templateUrl: './confirmmail.component.html'
})
export class ConfirmmailComponent {
  confirmMailMessageSuccess: string;
  confirmMailMessageDanger: string;


  constructor(public _userService: UserService,
    public route: ActivatedRoute) { 
      this.confirmMail();
  }

  confirmMail() {
    let data;
    this.route.queryParams.subscribe(params => {
      data = params;
    });
    this._userService.setUserData('confirm', data).subscribe(data => {
      let response = data as ResponseDataBase;
      if (response.METADATA.STATUS == AppConstants.STATUS.OK) {
        this.confirmMailMessageSuccess  = 'EMAIL_CONFIRMED';
        window.scrollTo(0, 0);
      } else {
        this.confirmMailMessageDanger = 'SOMETHING_WENT_WRONG';
        window.scrollTo(0, 0);
      }
      this._userService.loading = false;
    });
  }
  

}
