import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';

import {
  QuestionModal,
  TestExecuteModal,
  QuestionResponseModal,
} from '../../store/models/test-execute.model';

import {
  NextQues,
  PrevQues,
  SubmitAns,
  MarkQues,
} from '../../store/actions/test-execute.actions';
import { TestInstructionModal } from 'src/app/store/models/test-inst.model';
import { TestExecuteService } from '../services/test-execute.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  private subscription: Subscription;
  index: number = 0;
  quesId: string;
  results: QuestionModal[];

  solvedList: QuestionResponseModal[];
  markedList: QuestionResponseModal[];
  isMarked: boolean = false;
  optionIndex: number;

  currentSection: string;

  constructor(
    private store: Store<{ testExecute: TestExecuteModal }>,
    private store2: Store<{ testInst: TestInstructionModal }>,
    private testExecuteService: TestExecuteService
  ) {
    store.pipe(select('testExecute')).subscribe((values) => {
      this.results = values.quesList;
      this.index = values.quesIndex;
      this.solvedList = values.solvedList;
      this.markedList = values.markedList;

      this.quesId = values.quesList[this.index].id;
      this.markedList.findIndex((list) => list.index === this.index) >= 0
        ? (this.isMarked = true)
        : (this.isMarked = false);
      this.optionIndex = values.solvedList.find(
        (list) => list.id === values.quesList[values.quesIndex].id
      )?.index;

      //console.log(this.solvedList);
    });

    store2.pipe(select('testInst')).subscribe((res) => {
      this.currentSection = res.activeSection;
    });
  }

  ngOnInit(): void {}

  nextQues() {
    this.store.dispatch(new NextQues(1));
  }
  prevQues() {
    this.store.dispatch(new PrevQues(-1));
  }

  SubmitAnswer(optionindex) {
    if (!this.solvedList.find((list) => list.id === this.quesId)) {
      var s = new QuestionResponseModal();
      s.id = this.quesId;
      s.index = optionindex;
      s.res = this.testExecuteService.optionIndexToBinary(optionindex);
      this.store.dispatch(new SubmitAns(s));
    }
  }

  

  markQues(id, index) {
    if (!this.markedList.find((list) => list.id === id)) {
      var s = new QuestionResponseModal();
      s.id = id;
      s.index = index;
      s.res = '';

      this.store.dispatch(new MarkQues(s));
    }
  }
}
