import { TestExecuteModal, QuestionModal } from '../models/test-execute.model';
import { ActionParent } from '../actions/test-execute.actions';

import data from '../../test-execute/question.json';

import { TestExecuteActionTypes } from '../shared/enum/test-executeActionTypes.enum';

var initialState: TestExecuteModal = {
  quesIndex: 0,
  filterIndex: 0,
  allQuestionsList: data.results, // Dont Delete this
  quesList: data.results, // Dont Delete this
  markedList: [],
  solvedList: [],
  unsolvedList: [],
};

export function testExecuteReducer(state = initialState, action: ActionParent) {
  switch (action.type) {
    case TestExecuteActionTypes.IntialFetchQuestion:
      let x: QuestionModal[] = action.payload.filter(
        (ques) => ques.difficulty === 'Easy'
      );
      return {
        ...state,
        quesIndex: 0,
        filterIndex: 0,
        markedList: [],
        solvedList: [],
        allQuestionsList: action.payload,
        quesList: x,
        unsolvedList: x.map((ques, index) => {
          return {
            id: ques.id,
            index: index,
            res: '',
          };
        }),
      };

    case TestExecuteActionTypes.SectionQuesFilter:
      console.log(action.payload);
      let z = state.allQuestionsList.filter(
        (ques) => ques.difficulty === action.payload
      );
      return {
        ...state,
        quesIndex: 0,

        filterIndex: 0,
        quesList: z,
        markedList: [],
        solvedList: [],
        unsolvedList: z.map((ques, index) => {
          return {
            id: ques.id,
            index: index,
            res: '',
          };
        }),
      };
    case TestExecuteActionTypes.NextQues:
      return { ...state, quesIndex: state.quesIndex + action.payload };

    case TestExecuteActionTypes.PrevQues:
      return { ...state, quesIndex: state.quesIndex + action.payload };

    case TestExecuteActionTypes.NextFilter:
      return { ...state, filterIndex: action.payload };

    case TestExecuteActionTypes.PrevFilter:
      return { ...state, filterIndex: state.filterIndex + action.payload };

    case TestExecuteActionTypes.SkipQues:
      return { ...state, quesIndex: action.payload };
    case TestExecuteActionTypes.SubmitAns:
      return {
        ...state,
        solvedList: [...state.solvedList, action.payload],
        unsolvedList: state.unsolvedList.filter(
          (q) => q.id !== action.payload.id
        ),
      };
    case TestExecuteActionTypes.MarkQues:
      console.log(state.markedList);
      return {
        ...state,
        markedList: [...state.markedList, action.payload],
      };

    default:
      return state;
  }
}
