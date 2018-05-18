import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.token){
      req = req.clone({
        setHeaders: {
          Authorization: localStorage.token
        }
      });
    }
    return next.handle(req);
  }
}