import { Component, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SystemJsNgModuleLoaderConfig } from '@angular/core/src/linker/system_js_ng_module_factory_loader';
import * as moment from 'moment';
declare var $: any; // TODO show modal in othe way

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

  searchterms: SearchtermsInterface = {
    hospitalId: null,
    payorId: null,
    departmentId: null,
    doctorId: null,
    specialtyId: null,
    date: moment().add(1, 'days').format('YYYY-MM-DD'),
    scheduleId: null,
  };


  constructor(public router: Router,
    public _resourceService: ResourceService,
    public _userService: UserService) {  
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
  }

  reset() {
    this.searchterms = {
      hospitalId: null,
      payorId: null,
      departmentId: null,
      doctorId: null,
      specialtyId: null,
      date: moment().add(1, 'days').format('YYYY-MM-DD'),
      scheduleId: null,
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
    });
  }

  getConsultants(departmentlId) {
    let params = {
      departmentId: departmentlId,
    };
    this._resourceService.getResourceWithParams('doctors', params).subscribe(data => {
      let response = data as ResponseDataBase;
      this._resourceService.doctors = response.result;
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
