import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { TestInstructionService } from './services/instruction-page.service';
import {
  TestDetailsModal,
  TestInstructionModal,
} from '../store/models/test-inst.model';
import {
  ActiveSection,
  SubmitSection,
} from '../store/actions/test-inst.actions';
import { TestExecuteModal } from '../store/models/test-execute.model';
import { SectionQuesFilter } from '../store/actions/test-execute.actions';

@Component({
  selector: 'app-instruction-page',
  templateUrl: './instruction-page.component.html',
  styleUrls: ['./instruction-page.component.scss'],
})
export class InstructionPageComponent implements OnInit, OnDestroy {
  sections = ['Section A : Easy', 'Section B : Medium', 'Section C : Hard'];
  ExamID: number = 0;
  
  testDetails: TestDetailsModal;
  isSectionDone: any;
  timeDurationInSec: number;


  constructor(
    private testInstServices: TestInstructionService,
    private route: Router,
    private router: ActivatedRoute,
    private store: Store<{ testInst: TestInstructionModal }>,
    private store2: Store<{ testExecute: TestExecuteModal }>
  ) {
    this.store.pipe(select('testInst')).subscribe((values) => {
      this.testDetails = values.testDetails;
      this.isSectionDone = values.isSectionDone;
    });

    let timeStr = this.testDetails.duration;
    this.timeDurationInSec =
      +timeStr.split(':')[0] + +timeStr.split(':')[1] + +timeStr.split(':')[2];
  }

  ngOnInit() {

    const examId = parseInt(this.router.snapshot.paramMap.get('examId'));
    this.ExamID = examId;
    this.testInstServices.fetchIntialData(this.ExamID);
    let candId = localStorage.getItem('candId');
    console.log(this.ExamID + candId);
    this.testInstServices.fetchIntialQuestion(candId);
  }

  ngOnDestroy() {
    //
  }

  onProceed(section: string) {
    switch (section) {
      case 'Easy':
        this.store.dispatch(new ActiveSection('Section A Easy'));
        break;
      case 'Medium':
        this.store.dispatch(new ActiveSection('Section B Medium'));
        this.store2.dispatch(new SectionQuesFilter('Medium'));
        break;
      case 'Hard':
        this.store.dispatch(new ActiveSection('Section C Hard'));
        this.store2.dispatch(new SectionQuesFilter('Hard'));
        break;
    }

    this.route.navigate(['/test-execute']);
  }
}
