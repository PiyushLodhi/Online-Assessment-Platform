import { Action } from '@ngrx/store';

import { TestInstActionTypes } from '../shared/enum/test-instActionTypes.enum';

export class ActionParent implements Action {
  type: any;
  payload: any;
}

export class IntialFetchData implements ActionParent {
  type = TestInstActionTypes.IntialFetchData;

  constructor(public payload: any) {
    // console.log(payload);
  }
}

export class ActiveSection implements ActionParent {
  type = TestInstActionTypes.ActiveSection;

  constructor(public payload: any) {}
}

export class SubmitSection implements ActionParent {
  type = TestInstActionTypes.SubmitSection;

  constructor(public payload: any) {}
}
