import { Time } from '@angular/common';

export class TestModel {
    public testId: string;
    public testName: string;
    public testPurpose: string;
    //public testDuration: string;
    public testRound:string;
    public questions:number;
    public isPremium:boolean;
    public easy:number;
    public medium:number;
    public hard:number;
    public tblQuestionBanks: QuestionBank[] = [];
}

export class TestUpdateDto{
    public testName:string;
    public testPurpose:string;
    //public testDuration:string;
    public testRound:string;
}

export class QuestionBank{
    public id: string;
    public questionType: string;
    public questionTopic: string;
    public question: string;
    public option1: string;
    public option2: string;
    public option3: string;
    public option4: string;
    public correctAnswer: string;
    public scoringPoints: string;
    public difficultyLevel: string;
    //public testId: string;
    //public questionpoolId:number = 1;
    //public test:string = null;
}
export class CreateQuestions{
    public testId:string;
    public tblQuestionBanks: QuestionBank[] = [];
}

export class QuestionOption{
    public optionId: string;
    public optionValue: string;
    public optionStatus: boolean;
}

export class ModifiedQuestionBank {
    public id: string;
    public questionType: string;
    public questionTopic: string;
    public question: string;
    public option: QuestionOption[] = [];
    public scoringPoints: string;
    public difficultyLevel: string;
    public testId: string;
}

export class DifficultyLevel{
    public Easy:number = 0;
    public Medium:number = 0;
    public Hard:number = 0;
}

export class ShareTest{
    public candidateEmail:string;
    public date:Date;
    public testId:string;
    public duration:Time;
    public negBool:number;
    public sectionA:number;
    public sectionB:number;
    public sectionC:number;
}

export class PremiumTest{
    public testId: string;
    public testName: string;
    public testPurpose: string;
    //public testDuration: string;
    public testRound:string;
    public questions:number;
}