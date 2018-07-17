import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Components
// Components
import {
  BookappointmentsComponent,
  MyappointmentsComponent,
  AccountinfoComponent,
  AdminComponent,
  RegisterComponent,
  ConfirmmailComponent
} from "./components/index.components";

// Routes configuration
const appRoutes: Routes = [
  { path: 'bookappointments', component: BookappointmentsComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'myappointments',
    component: MyappointmentsComponent,

  },
  {
    path: 'accountinfo',
    component: AccountinfoComponent,

  },
  {
    path: 'admin',
    component: AdminComponent,

  },
  {
    path: 'confirm',
    component: ConfirmmailComponent,

  },
  { path: '**', redirectTo: 'bookappointments', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
