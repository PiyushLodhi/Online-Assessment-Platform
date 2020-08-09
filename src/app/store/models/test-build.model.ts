

export class TestBuildQuestionModal {
  id: string;
  category?: string;
  type?: string;
  difficulty: string;
  description: string;
  correct_answer?: string;
  options?: string[];
}

export class TestBuild {
  quesList: TestBuildQuestionModal[];
  filterOption: {
    difficulty: string;
    type: string;
    category: string;
  };
  count: {
    easy:number ,
    medium:number ,
    hard:number
  };
  pageNo: number;
  cartList: TestBuildQuestionModal[];
}
