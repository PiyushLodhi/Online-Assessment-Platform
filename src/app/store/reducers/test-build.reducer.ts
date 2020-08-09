import { ActionReducer, Action } from '@ngrx/store';

import { TestBuild } from '../models/test-build.model';
import { ActionParent } from '../actions/test-build.actions';
import { QuestionModal, TestExecuteModal } from '../../store/models/test-execute.model';

import data from '../../test-build/question.json';

import { TestBuildActionTypes } from '../shared/enum/test-buildActionTypes.enum';

var initialState: TestBuild = {
  quesList: data.results,

  filterOption: {
    difficulty: 'easy',
    type: 'multiple',
    category: 'Physics',
  },

  count:{
    easy:0 ,
    medium:0 ,
    hard: 0
  } ,

  pageNo: 1,

  cartList: [],
};

export function testBuildReducer(state = initialState, action: ActionParent) {
  switch (action.type) {
    case TestBuildActionTypes.FilterDifficulty:
      return {
        ...state,
        filterOption: { ...state.filterOption, difficulty: action.payload },
      };

    case TestBuildActionTypes.FilterTopic:
      return {
        ...state,
        filterOption: { ...state.filterOption, category: action.payload },
      };

    case TestBuildActionTypes.FilterType:
      return {
        ...state,
        filterOption: { ...state.filterOption, type: action.payload },
      };

    case TestBuildActionTypes.AddCart:
      
      return {
        ...state,
        cartList: [...state.cartList, action.payload],
      };

    case TestBuildActionTypes.RemoveCart:
       var newCartList =state.cartList.filter((item)=>{
        return item.id !== action.payload
      });
      
     
      return {
        ...state,
        cartList:newCartList
      };
    case TestBuildActionTypes.SubmitCart:
      return state.cartList;

    default:
      return state;
  }
}
