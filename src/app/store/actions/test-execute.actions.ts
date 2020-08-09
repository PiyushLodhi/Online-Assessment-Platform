import { Action } from '@ngrx/store';

import { TestExecuteActionTypes } from '../shared/enum/test-executeActionTypes.enum';
import { TestInstActionTypes } from '../shared/enum/test-instActionTypes.enum';
import { TestExecuteModal } from '../models/test-execute.model';

export class ActionParent implements Action {
  type: any;
  payload: any;
}

export class IntialFetchQuestion implements ActionParent {
  type = TestExecuteActionTypes.IntialFetchQuestion;

  constructor(public payload: any) {}
}

export class SectionQuesFilter implements ActionParent {
  type=  TestExecuteActionTypes.SectionQuesFilter;
  constructor(public payload: any) {}
}

export class NextQues implements ActionParent {
  type = TestExecuteActionTypes.NextQues;

  constructor(public payload: any) {}
}

export class PrevQues implements ActionParent {
  type = TestExecuteActionTypes.PrevQues;

  constructor(public payload: any) {}
}

export class MarkQues implements ActionParent {
  type = TestExecuteActionTypes.MarkQues;

  constructor(public payload: any) {
    console.log(payload);
  }
}

export class SkipQues implements ActionParent {
  type = TestExecuteActionTypes.SkipQues;

  constructor(public payload: any) {}
}

export class NextFilter implements ActionParent {
  type = TestExecuteActionTypes.NextFilter;

  constructor(public payload: any) {}
}
export class PrevFilter implements ActionParent {
  type = TestExecuteActionTypes.PrevFilter;

  constructor(public payload: any) {}
}
export class SubmitAns implements ActionParent {
  type = TestExecuteActionTypes.SubmitAns;

  constructor(public payload: any) {}
}
