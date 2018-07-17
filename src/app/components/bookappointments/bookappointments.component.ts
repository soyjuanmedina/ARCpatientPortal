import { Component, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SystemJsNgModuleLoaderConfig } from '@angular/core/src/linker/system_js_ng_module_factory_loader';
import * as moment from 'moment';
declare var $: any; // TODO show modal in othe way

// Date picker
import { DatepickerOptions } from 'ng2-datepicker';

// Translate
import { TranslateService } from 'ng2-translate';

// Animations
import { trigger, state, style, animate, transition, keyframes, query, stagger} from '@angular/animations';

// App Constants
import { AppConstants } from '../../appConstants';

// Services
import { ResourceService,
  UserService} from "../../services/index.service";

// Interfaces
import { SearchtermsInterface, ResponseDataBase } from '../../interfaces/index.interface';


@Component({
  selector: 'app-bookappointments',
  templateUrl: './bookappointments.component.html',
  animations: [
    trigger('listAnimation', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('300ms', [
          animate('0.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
            style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
          ]))]), { optional: true }),
        query(':leave', stagger('300ms', [
          animate('0.6s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
            style({ opacity: 0.5, transform: 'translateX(-15px)', offset: 0.7 }),
            style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
          ]))]), { optional: true })
      ]),     
    ])
  ],
})
export class BookappointmentsComponent implements AfterViewInit {

  patient;
  freeslots = [];
  tomorrow = moment(new Date()).add(1, 'days');

  searchterms: SearchtermsInterface = {
    hospitalId: null,
    departmentId: null,
    doctorId: null,
    date: null,
  };

  options: DatepickerOptions = {
    minYear: moment(new Date()).year(),
    maxYear: 2040,
    displayFormat: "DD-MM-YYYY",
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 1, // 0 - Sunday, 1 - Monday
    minDate: new Date(new Date()), // Minimal selectable date
  };

  constructor(public router: Router,
    public _resourceService: ResourceService,
    public translate: TranslateService,
    public _userService: UserService) {

    this.searchterms.date = this.tomorrow;

    
    }

  searchFreeSlots(){
    this.freeslots = AppConstants.DUMMYSLOTS;
  }

  sendFreeslot(freeslot) {
    this._resourceService.selectedFreeslot = freeslot;
  }

  cancelSelectedfreeslot() {
    delete this._resourceService.selectedFreeslot;
  }

  bookSlot(selectedFreeslot){
    this._userService.user.appointments.push(selectedFreeslot);
    delete this._resourceService.selectedFreeslot;
    this.router.navigate(['/myappointments']);
  }

  reset() {
    this.searchterms = {
      hospitalId: null,
      departmentId: null,
      doctorId: null,
      date: { year: this.tomorrow.year(), month: this.tomorrow.month() + 1, day: this.tomorrow.date() }
    };
    this.freeslots = [];
  }

  goRegister() {
    this.router.navigate(['/register']);
  }

  getDepartments(hospitalId) {
    let params = {
      hospitalId: hospitalId,
    };
    this._resourceService.getResourceWithParams('departments', params).subscribe(data => {
      let response = data as ResponseDataBase;
      this._resourceService.departments = response.result;
      this._resourceService.loading = false;
    });
  }

  getConsultants(departmentlId) {
    let params = {
      departmentId: departmentlId,
    };
    this._resourceService.getResourceWithParams('doctors', params).subscribe(data => {
      let response = data as ResponseDataBase;
      this._resourceService.doctors = response.result;
      this._resourceService.loading = false;
    });
  }

  discardFreeslot(id){
    this.freeslots.splice(id, 1);
  }

  ngAfterViewInit() {
    if (this._resourceService.selectedFreeslot) {
      $('#FreeSlotModal').modal('show');
    }
    if (this._resourceService.hospitals.length == 1) {
      this.getDepartments('0001');
    }
  }

}
