import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

// Services
import { UserService, ResourceService, AuthService } from "../../../services/index.service";

// Interfaces
import { ResponseDataBase } from "../../../interfaces/index.interface";

//Constants
import { AppConstants } from "../../../appConstants";



@Component({
  selector: "app-accountinfo",
  templateUrl: "./accountinfo.component.html",
})
export class AccountinfoComponent implements OnInit {

  user;
  languageName;
  formaMail: FormGroup;
  formaPass: FormGroup;
  alert;

  constructor(public _userService: UserService,
    public _resourceService: ResourceService,
    public _authService: AuthService) {

    this.user = this._userService.user;

    if(this._resourceService.languages){
      this.languageName = this._resourceService.languages.filter(item => item.id === this.user.language).map(item => item.name)
    }

    this.formaMail = new FormGroup({
      "email": new FormControl("", [
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
      ]),
      "confirmemail": new FormControl(),
    });

    this.formaPass = new FormGroup({
      "password": new FormControl(),
      "confirmpassword": new FormControl(),
    });

    this.formaPass.controls["confirmpassword"].setValidators([
      this.notEqualPassword.bind(this.formaPass)
    ]);

    this.formaMail.controls["confirmemail"].setValidators([
      Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"),
      this.notEqualMail.bind(this.formaMail)
    ]);

  }

  deleteAccount() {
    this._userService.deleteUser(this._userService.user).subscribe();
    this._authService.logout();
  }

  notEqualMail(control: FormControl): { [s: string]: boolean } {

    const forma: any = this;

    if (control.value !== forma.controls["email"].value) {
      return {
        notEqualsMail: true
      };
    }

    return null;

  }

  notEqualPassword(control: FormControl): { [s: string]: boolean } {

    const forma: any = this;

    if (control.value !== forma.controls["password"].value) {
      return {
        notEqualsPass: true
      };
    }

    return null;

  }

  changeMail() {
    let params = {
      email: this.formaMail.controls.email.value
    };
    this._userService.changeUserMail(params).subscribe(data => {
      let response = data as ResponseDataBase;
      if (response.METADATA.STATUS == AppConstants.STATUS.OK) {
        this.alert = 'You have been successfully change your mail';
        window.scrollTo(0, 0);
      } else {
        this.alert = 'Your email could not be changed';
        window.scrollTo(0, 0);
      }
    });
  }

  changePass() {

    let params = {
      password: this.formaPass.controls.password.value
    };
    this._userService.changeUserPass(params).subscribe(data => {
      let response = data as ResponseDataBase;
      if (response.METADATA.STATUS == AppConstants.STATUS.OK) {
        this.alert = 'You have been successfully change your password';
        window.scrollTo(0, 0);
      } else {
        this.alert = 'Your password could not be changed';
        window.scrollTo(0, 0);
      }
    });
  }
  

  ngOnInit() {
    delete this.alert;
  }

}
