import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Guard
import { AuthGuardService } from './services/auth-guard.service';

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
    canActivate: [AuthGuardService],
  },
  {
    path: 'accountinfo',
    component: AccountinfoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
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
