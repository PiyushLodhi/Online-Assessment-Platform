import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PerformanceData } from '../models/result-report.model';
import { TopicPerformance } from '../models/result-report.model';
import { SectionPerformance } from '../models/result-report.model';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {AppConstants} from '../../shared/constants/AppConstants';

@Injectable({
  providedIn: 'root'
})
export class ResultReportService {

  baseUrl = AppConstants.apiURL     //"https://localhost:5001";

  constructor(private http: HttpClient) { }

    //GET api/candperf
    public getPerformanceData(examid: string, cid: string): Observable<PerformanceData> {
      const  params = new  HttpParams().set('examid', examid).set('cid', cid );  
      const  headers = new  HttpHeaders().set('content-type', 'application/json').set('No-Auth', 'True');
      return this.http.get<PerformanceData>(this.baseUrl + "/candperf", {headers: headers, params: params});
    
    }
}
