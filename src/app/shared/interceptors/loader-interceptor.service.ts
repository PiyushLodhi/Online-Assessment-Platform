import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, retry, catchError } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoaderInterceptorService implements HttpInterceptor {
  constructor(public loaderService: LoaderService, private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.show();
    
    if (req.headers.get('No-Auth') == 'True') {
      return next.handle(req).pipe(
        //retry(3),
         catchError(this.handleError),
        finalize(() => this.loaderService.hide())
      );
    }

    const userToken = sessionStorage.getItem('token');
    
     if (userToken != null) {
      const clonedrq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + userToken),
      });
      return next.handle(clonedrq).pipe(
        //retry(3),
        catchError(this.handleError),
        finalize(() => this.loaderService.hide())
      );
    }
  }

  //Handle Error
  private handleError(errorResponse: HttpErrorResponse) {
    //Client Side Error
    if (errorResponse.error instanceof ErrorEvent) {
      //alert("Server Side Error: " +errorResponse)
      console.error('Client Side Error: ', errorResponse.error.message);
    }
    //Server Side Error
    else {
      console.error('Server Side Error: ', errorResponse);
    }
    return throwError(errorResponse);
  }
}
