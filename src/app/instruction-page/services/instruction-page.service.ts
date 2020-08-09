import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  TestInstructionModal,
  TestDetailsModal,
} from '../../store/models/test-inst.model';

import { AppConstants } from '../../shared/constants/AppConstants';
import { IntialFetchData } from 'src/app/store/actions/test-inst.actions';
import { IntialFetchQuestion } from 'src/app/store/actions/test-execute.actions';
import { QuestionModal, TestExecuteModal } from 'src/app/store/models/test-execute.model';


interface ApiresponseQuestionList {
  id: number;
  question: string;
  difficulty: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}


@Injectable({ providedIn: 'root' })
export class TestInstructionService {
  baseURL: string = AppConstants.apiURL; //"https://localhost:5001/api" ;

  constructor(private http: HttpClient, private store2: Store<{ testExecute: TestExecuteModal }>,  private store: Store<{ testInst: TestInstructionModal }>) {}

  fetchIntialData(examId: number) {
    
    return this.http
      .get(this.baseURL +'/testinst/'+ examId.toString(),  {
        responseType: 'json',
        headers: new HttpHeaders({
          'content-type': 'application/json',        
        }),
      })
      .subscribe(
        (res) => {this.store.dispatch(new IntialFetchData(res))},
        (error) => {
          console.log(error);
        }
      );
  }

  fetchIntialQuestion(candId: string) {
    return this.http
      .get(this.baseURL + '/testapi/' + candId, {
        responseType: 'json',
        headers: new HttpHeaders({
          'content-type': 'application/json',
        }),
      })
      .subscribe(
        (res: ApiresponseQuestionList[]) => {
          const x: QuestionModal[] = [];

          res.map((element) => {
            let y: QuestionModal = {
              id: '',
              description: '',
              options: [],
              difficulty: '',
            };

            y.id = '' + element.id;
            y.description = element.question;
            y.difficulty = element.difficulty;
            y.options = [
              element.option1,
              element.option2,
              element.option3,
              element.option4,
            ];

            x.push(y);
          });

          this.store2.dispatch(new IntialFetchQuestion(x));
        },
        (error) => {
          throwError(error);
        }
      );
  }
}
