import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Candidate } from './candidate';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateFormService {

  _url = ''; //fill when server url found
  constructor(private _http: HttpClient) { }

  registerCandidate (candidate: Candidate) {
    return this._http.post<any>(this._url, candidate)
      .pipe(catchError(this.errorHandler))
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error)
  }
}