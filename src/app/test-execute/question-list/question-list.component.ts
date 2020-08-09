import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { QuestionModal, TestExecuteModal, QuestionResponseModal } from '../../store/models/test-execute.model';

import { Store, select } from '@ngrx/store';

import { SkipQues , NextFilter , PrevFilter } from '../../store/actions/test-execute.actions';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  
  questionList : QuestionModal[]  = [];

  filterIndex:number =0;
  quesIndex : number =0;
  quesId:string;
  filters = ["All" , "Unsolved" , "Marked"];
  markedList : QuestionResponseModal[];
  unsolvedList : QuestionResponseModal[];
  

  constructor(private store: Store<{ testExecute: TestExecuteModal }>) {
    store.pipe(select('testExecute')).subscribe((values) => {
     
      this.filterIndex = values.filterIndex;
      this.questionList = values.quesList ;
      this.quesIndex = values.quesIndex;
      this.markedList = values.markedList;
      this.unsolvedList = values.unsolvedList;

    });
    this.quesId = this.questionList.length >0 ? this.questionList[this.quesIndex].id : "";
  }

  ngOnInit(): void {
  }

  nextFilter(index:number){
    this.store.dispatch(new NextFilter(index));
  }

  prevFilter(){
    this.store.dispatch(new PrevFilter(-1));
  }

  skipQues(id:string){

    this.store.dispatch(new SkipQues(this.idToIndex(id)));
  }

  idToIndex(id:string){

    let x = this.questionList.findIndex(list=> list.id === id);
    return x;

  }

  

}
