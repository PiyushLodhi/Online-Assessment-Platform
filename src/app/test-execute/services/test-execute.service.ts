import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppConstants } from '../../shared/constants/AppConstants';
import { throwError } from 'rxjs';
import { QuestionResponseModal } from 'src/app/store/models/test-execute.model';

@Injectable({ providedIn: 'root' })
export class TestExecuteService {
  baseURL: string = AppConstants.apiURL; //"https://localhost:5001/api" ;

  constructor(private http: HttpClient) {}

  SubmitTestSection(solvedQues: QuestionResponseModal[]) {
    let candId = localStorage.getItem('candId');
    let examId = localStorage.getItem('examId');
    let token = sessionStorage.getItem('token');

    let candidateAnswers = [];

    solvedQues.map((ques) => {
      candidateAnswers.push({ QuesId: ques.id, CandidateAnswer: ques.res });
    });

    const body = {
      CandidateId: +candId,
      ExamId: +examId,
      CandidateAnswers: candidateAnswers,
    };

    // console.log(JSON.stringify(body));

    return this.http
      .post('https://localhost:5001/api/testapi/', body, {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          // 'No-Auth': 'True',
          // Authorization: 'Bearer ' + token,
        }),
      })
     
  }

  optionIndexToBinary(optionIndex: number) {
    switch (optionIndex) {
      case 0:
        return '0001';
        break;
      case 1:
        return '0010';
        break;
      case 2:
        return '0100';
        break;
      case 3:
        return '1000';
        break;
      default : return "0001"  
    }
  }
}
