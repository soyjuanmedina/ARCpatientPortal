import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate';

// Interfaces
import { UserInterface, ResponseDataBase } from '../../interfaces/index.interface';

// Services
import { UserService,
  ResourceService } from "../../services/index.service";

//Constants
import { AppConstants } from '../../appConstants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  alertDanger: string;
  alertWarning: string;
  alertSuccess: string;

  forma: FormGroup;

  user: UserInterface = {
    name: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    language: '',
  };

  constructor(public _userService: UserService,
    public _resourceService: ResourceService,
    public translate: TranslateService,
    public router: Router) {

    this.forma = new FormGroup({

      'name': new FormControl('', Validators.required),
      'lastname': new FormControl('', Validators.required),
      'email': new FormControl('', [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
      ]),
      'password': new FormControl('', Validators.required),
      'confirmpassword': new FormControl(),
      'phoneNumber': new FormControl(),
      'language': new FormControl('', Validators.required),
    });

    this.forma.controls['confirmpassword'].setValidators([
      Validators.required,
      this.notEqualPassword.bind(this.forma)
    ])

  }

  ngOnInit() {
    delete this.alertDanger;
    delete this.alertWarning;
    delete this.alertSuccess;
  }


  notEqualPassword(control: FormControl): { [s: string]: boolean } {
    
    let forma: any = this;
    if (control.value !== forma.controls['password'].value) {
      return {
        notequalspass: true
      };
    }
    return null;
  }

  notEqualMail(control: FormControl): { [s: string]: boolean } {

    let forma: any = this;

    if (control.value !== forma.controls['email'].value) {
      return {
        notEqualsMail: true
      };
    }

    return null;

  }

  registerUser() {
    delete this.alertDanger;
    delete this.alertWarning;
    delete this.alertSuccess;
    let params = {
      name: this.forma.value.name,
      lastname: this.forma.value.lastname,
      email: this.forma.value.email,
      phoneNumber: this.forma.value.phoneNumber,
      language: this.forma.value.language,
      password: this.forma.value.password
    };

    this._userService.registerUser(params).subscribe(data => {
      let response = data as ResponseDataBase;
      console.log(response);
      if (response.METADATA.STATUS == AppConstants.STATUS.OK) {
        this.alertWarning = 'You have been sent an email. Please confirm your email address before logging in';
        window.scrollTo(0, 0);
      } else {
        this.alertDanger = response.METADATA.ERROR_MESSAGE;
        console.log(this.alertDanger);
        window.scrollTo(0, 0);
      }
      this._userService.loading = false;
    });

  }

  resetRegisterForm() {
    this.forma.reset(this.user);
  }

}
