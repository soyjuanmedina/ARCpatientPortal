import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

// Print
import * as jsPDF from 'jspdf'

// ICS
declare var ics;
declare var FileSaver;

// Animations
import { trigger, state, style, animate, transition, keyframes, query, stagger} from '@angular/animations';

// Services
import { UserService } from "../../../services/index.service";

@Component({
  selector: 'app-myappointments',
  templateUrl: './myappointments.component.html',
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
export class MyappointmentsComponent implements OnInit {

  indexToCancel: number;
  selectedSlotToCancel: any;

  constructor(public _userService: UserService) {
    window.scrollTo(0, 0);
  }

  deleteAppointment(){
    this._userService.user.appointments.splice(this.indexToCancel, 1);
    // this._userService.updateUser(this._userService.user).subscribe();
  }

  selectSlotToCancel(slot, index){
    this.indexToCancel = index;
    this.selectedSlotToCancel = slot;
  }

  addToCalendar(slot, index){
    console.log('addToCalendar', slot, index);
    let cal = ics();
    var message = "Appointment" + slot.doctorName;
    var st = slot.date + ' ' + slot.hour;
    var dateStart = moment(st);
    var dateEnd = moment(st).add(30, 'minutes');
    cal.addEvent(slot.department, message, 'Golden Mile 1\, Office 30 Palm Jumeirah', dateStart, dateEnd);
    cal.download();
  }

  print(slot, index){
    console.log('print', slot, index);
    var doc = new jsPDF();
    doc.text(20, 20, "Appointment with" + slot.doctorName);
    doc.text(20, 30, 'You have an appointment the' + slot.date + ' at ' + slot.hour);

    // Save the PDF
    doc.save('appointment.pdf');
  }

  ngOnInit() {
  }

}
