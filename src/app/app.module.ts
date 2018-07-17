import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';

// Interceptor http
import { AllHttpRequestsInterceptor } from "./interceptors/allhttprequests.interceptor";

// Angular animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components from ng-bootstrap.github.io
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgDatepickerModule } from 'ng2-datepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

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
  AdminComponent,
  ConfirmmailComponent } from "./components/index.components";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    BookappointmentsComponent,
    RegisterComponent,
    AccountinfoComponent,
    MyappointmentsComponent,
    AdminComponent,
    ConfirmmailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    NgDatepickerModule,
    BsDatepickerModule.forRoot(),
    NgbModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
      deps: [Http]
  })
  ],
  providers: [
    UserService,
    AuthService,
    ResourceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AllHttpRequestsInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
