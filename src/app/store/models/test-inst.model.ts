export class TestInstructionModal {
  testDetails: TestDetailsModal;

  isSectionDone: {
    Easy: boolean;
    Medium: boolean;
    Hard: boolean;
  };

  activeSection: string;
  startTime: number;
}

export class TestDetailsModal {
  totalMarks: number;
  easy: number;
  easycorrect: number;
  easynegative: number;
  medium: number;
  mediumcorrect: number;
  mediumnegative: number;
  hard: number;
  hardcorrect: number;
  hardnegative: number;
  duration: string;
  testid: number;
  testpurpose: string;

}
