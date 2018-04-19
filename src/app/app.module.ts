import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Translete
import {TranslateService,
  TranslateLoader,
  TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {TranslateModule} from 'ng2-translate';
import {Http, HttpModule} from '@angular/http';

// Routes
import { AppRoutingModule } from './app.routes';

// Services
import { UserService,
  AuthService,
  ResourceService } from "./services/index.service";

// Components
import { AppComponent,
  NavbarComponent,
  FooterComponent,
  BookappointmentsComponent,
  RegisterComponent,
  AccountinfoComponent,
  MyappointmentsComponent,
  AdminComponent } from "./components/index.components";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    BookappointmentsComponent,
    RegisterComponent,
    AccountinfoComponent,
    MyappointmentsComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
      deps: [Http]
  })
  ],
  providers: [
    UserService,
    AuthService,
    ResourceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
