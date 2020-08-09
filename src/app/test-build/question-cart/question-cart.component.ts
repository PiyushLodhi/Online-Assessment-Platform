import { Component, OnInit } from '@angular/core';


import { TestBuildQuestionModal } from '../../store/models/test-build.model';

import { TestBuild } from '../../store/models/test-build.model';

import { Store, select } from '@ngrx/store';
import { RemoveCart } from 'src/app/store/actions/test-build.actions';

@Component({
  selector: 'app-question-cart',
  templateUrl: './question-cart.component.html',
  styleUrls: ['./question-cart.component.scss'],
})


export class QuestionCartComponent implements OnInit {
  results: TestBuildQuestionModal[];
  

  questionsDifficulty = ['Easy', 'Medium',  'Hard', 'Total'];

  collapse1: boolean = false;
  collapse2: boolean = false;
  collapse3: boolean = false;

  constructor(private store: Store<{ testBuild: TestBuild }>) {
    store.pipe(select('testBuild')).subscribe((values) => {
      this.results = values.cartList;
    });
  }

  removeFromCart(id: string) {
    this.store.dispatch(new RemoveCart(id));
  }

  onToggleEasy() {
    this.collapse1 = !this.collapse1;
  }

  onToggleMedium() {
    this.collapse2 = !this.collapse2;
  }

  onToggleHard() {
    this.collapse3 = !this.collapse3;
  }

  ngOnInit(): void {}
}
