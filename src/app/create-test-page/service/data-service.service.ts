import { Injectable } from '@angular/core';
import { QuestionBank, ModifiedQuestionBank } from '../models/test-model.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data:ModifiedQuestionBank;
  //private question:QuestionBank;

  constructor() { }

  setData(value:ModifiedQuestionBank){
    this.data = value;
  }
  getData():ModifiedQuestionBank{
    return this.data;
  }
}
