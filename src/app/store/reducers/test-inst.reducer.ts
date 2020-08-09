import { ActionReducer, Action } from '@ngrx/store';

import { TestDetailsModal, TestInstructionModal } from '../models/test-inst.model';
import { ActionParent } from '../actions/test-inst.actions';

import { TestInstActionTypes } from '../shared/enum/test-instActionTypes.enum';
import { actionBegin } from '@syncfusion/ej2-angular-richtexteditor';


var initialState: TestInstructionModal = {
  testDetails: {
    easy: 0,
    medium: 0,
    hard: 0,
    easycorrect: 0,
    mediumcorrect: 0,
    hardcorrect: 0,
    easynegative: 0,
    mediumnegative: 0,
    hardnegative: 0,
    duration: '',
    totalMarks: 0,
    testid: 0,
    testpurpose: '',
    
  },
  isSectionDone: {
    Easy: true,
    Medium: false,
    Hard: false,
  },

  startTime: Date.now(),

  activeSection: '',
};

export function testInstructionReducer(
  state = initialState,
  action: ActionParent
) {
  switch (action.type) {
    case TestInstActionTypes.IntialFetchData:
      // console.log(action.payload);
      return { ...state, testDetails: action.payload };
    case TestInstActionTypes.ActiveSection:
      return { ...state, activeSection: action.payload };
    case TestInstActionTypes.SubmitSection:
      if (action.payload === 'Easy') {
        return {
          ...state,
          isSectionDone: { ...state.isSectionDone, Medium: true, Easy: false },
        };
      }
      if (action.payload === 'Medium') {
        return {
          ...state,
          isSectionDone: { ...state.isSectionDone, Medium: false, Hard: true },
        };
      }
      if (action.payload === 'Hard') {
        return {
          ...state,
          isSectionDone: { ...state.isSectionDone, Hard: false },
        };
      }

    default:
      return state;
  }
}
