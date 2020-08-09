export class QuestionModal {
  id: string;
  difficulty: string;
  description: string;
  correct_answer?: string;
  options?: string[];
}

export class QuestionResponseModal {
  id: string;
  index: number;
  res?: string;
}

export class TestExecuteModal {
  quesIndex: number;
  filterIndex: number;
  allQuestionsList: QuestionModal[];
  quesList: QuestionModal[];
  unsolvedList: QuestionResponseModal[];
  solvedList: QuestionResponseModal[];
  markedList: QuestionResponseModal[];
}
