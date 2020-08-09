import { Component, OnInit, OnDestroy } from '@angular/core';

import {
  QuestionModal,
  TestExecuteModal,
  QuestionResponseModal,
} from '../../store/models/test-execute.model';

import { Observable, throwError, Subscription, timer } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { TestInstructionModal } from 'src/app/store/models/test-inst.model';
import { SubmitSection } from 'src/app/store/actions/test-inst.actions';
import { Router } from '@angular/router';
import { TestExecuteService } from '../services/test-execute.service';

@Component({
  selector: 'app-exam-stat',
  templateUrl: './exam-stat.component.html',
  styleUrls: ['./exam-stat.component.scss'],
})
export class ExamStatComponent implements OnInit, OnDestroy {
  countDownTime: number;
  now: number;
  timeInStr: string;
  duration: number;
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  distance: number = 0;
  percent: number = 0;

  solvedQues: QuestionResponseModal[];

  totalQuesLen: number;
  currentSection: string;
  x: string;
  y: string;
  subcription: Subscription;

  constructor(
    private store: Store<{ testExecute: TestExecuteModal }>,
    private store2: Store<{ testInst: TestInstructionModal }>,
    private route: Router,
    private testExecuteService: TestExecuteService
  ) {
    store2.pipe(select('testInst')).subscribe((res) => {
      this.currentSection = res.activeSection;
      this.timeInStr = res.testDetails.duration;
      this.duration =
        (+this.timeInStr.split(':')[0] * 60 * 60 +
          +this.timeInStr.split(':')[1] * 60 +
          +this.timeInStr.split(':')[2]) *
        1000;
      this.countDownTime = res.startTime + this.duration;
    });

    store.pipe(select('testExecute')).subscribe((values) => {
      this.solvedQues = values.solvedList;
      this.totalQuesLen = values.quesList.length;
    });
  }

  ngOnInit(): void {
    this.x = localStorage.getItem('candId');
    this.y = localStorage.getItem('examId');

    var timer = setInterval(() => {
      this.now = new Date().getTime();
      this.distance = this.countDownTime - this.now;
      this.percent =
        100 - parseInt(((this.distance / this.duration) * 100).toFixed(0));

      this.days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor(
        (this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor(
        (this.distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      this.seconds = Math.floor((this.distance % (1000 * 60)) / 1000);

      if (this.distance < 0) {
        clearInterval(timer);
        this.SubmitSection();
      }
    }, 1000);
  }

  ngOnDestroy() {
    console.log("Destroy V");
    this.subcription.unsubscribe();
  }

  SubmitSection() {
    this.subcription = this.testExecuteService
      .SubmitTestSection(this.solvedQues)
      .subscribe(
        (res) => {
          if (
            this.distance < 0 ||
            this.currentSection.split(' ')[2] === 'Hard'
          ) {
            this.route.navigate(['/test-thankyou']);
          } else {
            const url: string = '/test-instruction/' + this.y + '/' + this.x;
            this.route.navigate([url]);
          }

          this.store2.dispatch(
            new SubmitSection(this.currentSection.split(' ')[2])
          );
        },
        (err) => {
          throwError(err);
        }
      );
  }
}
