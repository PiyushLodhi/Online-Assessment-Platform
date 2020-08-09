import { Component, OnInit, Input } from '@angular/core';
import data from '../question.json';

import { TestBuildQuestionModal } from '../../store/models/test-build.model';

import { TestBuild } from '../../store/models/test-build.model';

import { Store, select } from '@ngrx/store';

import {
  AddCart ,
  FilterDifficulty ,
  FilterTopic ,
  FilterType ,
  PageNoChange

} from '../../store/actions/test-build.actions';

@Component({
  selector: 'app-select-ques',
  templateUrl: './select-ques.component.html',
  styleUrls: ['./select-ques.component.scss'],
})
export class SelectQuesComponent implements OnInit {
  results: TestBuildQuestionModal[];
  query: string;

  @Input()
  topics: string[];
  @Input()
  difficultyList: string[];
  @Input()
  typeList: string[];


  category :string ;
  type:string ;
  difficulty :string;
  pageNo :number;

  constructor(private store: Store<{ testBuild: TestBuild }>) {

    store.pipe(select('testBuild')).subscribe((values) => {
     
      this.category = values.filterOption.category;
      this.difficulty = values.filterOption.difficulty;
      this.type = values.filterOption.type ;
      this.results = values.quesList ;
      this.pageNo = values.pageNo ;

     

    });

    
    
    this.query = '';
  }

  onSearch(results: { searchText: string }) {
    this.query = results.searchText;
  }

   AddtoQuestionCart(ques:TestBuildQuestionModal){
    this.store.dispatch(new AddCart(ques));

  }

  

  ngOnInit(): void {}
}
