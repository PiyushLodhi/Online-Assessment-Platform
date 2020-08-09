import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestModel, QuestionBank, TestUpdateDto, ShareTest, CreateQuestions, PremiumTest } from '../models/test-model.model';
import { Observable, throwError, from } from 'rxjs';
import { delay, map, catchError, retry } from 'rxjs/operators';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { AppConstants} from '../../shared/constants/AppConstants';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  private baseUrl = AppConstants.apiURL;
  constructor(private http: HttpClient) { }

  //POST api/tests
  public addTest(postData: Object) {
    let endPoints = "/Tests";
    return this.http.post(this.baseUrl + endPoints, postData);
  }
  //GET api/tests/id
  public getTestById(id: string): Observable<TestModel> {
    let endPoints = "/Tests/" + id;
    return this.http.get<TestModel>(this.baseUrl + endPoints);
  }
  //GET api/tests
  public getTests(): Observable<TestModel[]> {
    let endPoints = "/Tests";
    return this.http.get<TestModel[]>(this.baseUrl + endPoints);
  }
  //DELETE api/tests
  public deleteTest(id: string) {
    let endPoints = "/Tests/" + id;
    return this.http.delete(this.baseUrl + endPoints); 
  }
  //PATCH api/tests/id
  public testUpdate(updateData: TestUpdateDto, id: string) {
    console.log(id);
    let endPoints = "/Tests/" + id;
    return this.http.patch(
      this.baseUrl + endPoints,
      [
        { "op": "replace", "path": "/testName", "value": updateData.testName },
        { "op": "replace", "path": "/testPurpose", "value": updateData.testPurpose },
        { "op": "replace", "path": "/testRound", "value":updateData.testRound }
      ]
    );
  }
  //POST api/Questions
  public addQuestions(postData: CreateQuestions) {
    let endPoints = "/Questions";
    return this.http.post(this.baseUrl + endPoints, postData);
  }
  //PUT api/Questions/id
  public editQuestion(postData: QuestionBank, id: string) {
    let endPoints = "/Questions/" + id;
    return this.http.put(this.baseUrl + endPoints, postData);
  }
  //DELETE api/Questions/id
  public deleteQuestion(id: string) {
    let endPoints = "/Questions/" + id;
    return this.http.delete(this.baseUrl + endPoints); 
  }
  //GET api/roles
  public getRoles(): Observable<string[]> {
    let endPoints = "/Roles";
    return this.http.get<string[]>(this.baseUrl + endPoints).pipe(delay(5000));
  }

  //POST api/shareTest
  public shareTest(postData:ShareTest){
    let endPoints = "/invitation";
    return this.http.post(this.baseUrl + endPoints, postData);
  }

  //GET api/tests/getPremiumTests

  public getPremiumTests():Observable<PremiumTest[]>{
    let endPoints = "/tests/getPremiumTests";
    return this.http.get<PremiumTest[]>(this.baseUrl + endPoints);
  }

  //POST api/tests/importPremiumTest/id
  public importPremiumTest(id:string){
    console.log(id);
    let endPoints = "/tests/importPremiumTest";
    return this.http.post(this.baseUrl+endPoints,{'testId':id});
  }


  
}


