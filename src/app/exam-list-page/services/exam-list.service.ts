import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ExamModel  } from '../models/exam.model';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {AppConstants} from '../../shared/constants/AppConstants';

@Injectable({
  providedIn: 'root'
})

export class ExamListService {

  baseUrl = AppConstants.apiURL     //"https://localhost:5001";

  constructor(private http: HttpClient) { }

    //GET api/clientresult
    public getExamList( testId: string): Observable<ExamModel[]> {
      
      const  headers = new  HttpHeaders().set('content-type', 'application/json');//.set('No-Auth', 'True');
      const  params = new  HttpParams().set('testid', testId);

      return this.http.get<ExamModel[]>(this.baseUrl + "/clientresult", {headers: headers, params: params});
    
    }
    
}
