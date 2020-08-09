import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ResultRow } from '../models/result-row.model';
import { ResultMailData } from '../models/result-mail.model';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {AppConstants} from '../../shared/constants/AppConstants';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  baseUrl = AppConstants.apiURL     //"https://localhost:5001";

  constructor(private http: HttpClient) { }

    //GET api/clientresult
    public getResultRows(id: number): Observable<ResultRow[]> {
      
      const  headers = new  HttpHeaders().set('content-type', 'application/json').set('No-Auth', 'True');
      return this.http.get<ResultRow[]>(this.baseUrl + "/result/" + id, {headers: headers});
    
    }

    //POST api/<resultController>
    public sendMailData(result:ResultMailData) {
      const headers = { 'content-type': 'application/json',  'No-Auth': 'True'}  
      const body = JSON.stringify(result);
      console.log(body)
    
      return this.http.post(this.baseUrl + '/result', body,{'headers':headers})
      
    }
}
