import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { QuestionBoxComponent } from '../new-question/question-box/question-box.component'
import { CheckboxComponent } from '../new-question/checkbox/checkbox.component';
import { MultipleChoiceComponent } from '../new-question/multiple-choice/multiple-choice.component';
import { ShortAnswerComponent } from '../new-question/short-answer/short-answer.component';
import { LongAnswerComponent } from '../new-question/long-answer/long-answer.component';
import { ModifiedQuestionBank, TestModel, QuestionBank, QuestionOption } from '../models/test-model.model';
import { stringify } from 'querystring';
import { Options } from 'angular-bootstrap-md/lib/free/utils/positioning/models';
import { HttpServiceService } from '../service/http-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import {AppConstants} from '../../shared/constants/AppConstants';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {

  // reference
  _ref: any;
  @Input() parentId: string;
  @Input() isEdit:boolean;
  @Input() testId:string;
  selectedType: string;
  selectedTopic: string;
  //Get question edit data
  @Input() tempData: ModifiedQuestionBank;
  @Output() notifyParent: EventEmitter<string> = new EventEmitter<string>();
  //For question data reference 
  @ViewChild(QuestionBoxComponent) question;

  //for options data reference
  @ViewChild(CheckboxComponent) checkbox;
  @ViewChild(MultipleChoiceComponent) mutlichoice;
  @ViewChild(ShortAnswerComponent) shortAnswer;
  @ViewChild(LongAnswerComponent) longAnswer;

  /* Delete PopUp Start */
  popoverTitle = 'Are you sure?';
  popoverMessage = 'Are you really sure you want to do this?';
  confirmClicked = false;
  cancelClicked = false;
  /* Delete PopUp End */


  //difficulty level
  difficultyLevel: Array<string> = AppConstants.questionDifficultyLevel;
  selectedLevel: string;

  //Question Points
  points: string; 

  //dataObject: Object = {};
  getDataObject: QuestionBank = new QuestionBank();


  constructor(
    private httpService: HttpServiceService,
    private notifyService:NotificationsService
  ) {
    
   }

  ngOnInit(): void {
    this.selectedTopic = this.tempData.questionTopic;
    this.selectedType = this.tempData.questionType;
    this.selectedLevel = this.tempData.difficultyLevel;
    this.points = this.tempData.scoringPoints;
  }

  removeQuestion() {
    if(this.isEdit){
      this.httpService.deleteQuestion(this.parentId+','+this.testId).subscribe(data =>{
        //console.log(data);
      },
      (err:HttpErrorResponse)=>{
        this.notifyService.showError("Something is wrong", "Error!");
      },
      ()=>{
        this.confirmClicked = true;
        //console.log('remove question');
        this.notifyParent.emit(this.parentId);
        this._ref.destroy();
        this.notifyService.showWarning("You can proceed", "Question Deleted successfully !!");
      });
    }
    else{
      this.confirmClicked = true;
      //console.log('remove question');
      this.notifyParent.emit(this.parentId);
      this._ref.destroy();
      this.notifyService.showWarning("You can proceed", "Question Deleted successfully !!");
    }
  }

  getData(): QuestionBank {
    this.getDataObject.id = this.parentId;
    //this.getDataObject.testId = this.tempData.testId;
    this.getDataObject.question = this.question.getData();
    this.getDataObject.difficultyLevel = this.selectedLevel;
    this.getDataObject.questionTopic = this.selectedTopic;
    this.getDataObject.questionType = this.selectedType;
    this.getDataObject.scoringPoints = this.points;
    let option;
    if (this.selectedType == 'ShortAnswer') {
      option = this.shortAnswer.getData();
    }
    else if (this.selectedType == 'LongAnswer') {
      option = this.longAnswer.getData();
    }
    else if (this.selectedType == 'Multichoice') {
      option = this.mutlichoice.getData();
    }
    else if (this.selectedType == 'Checkbox') {
      option = this.checkbox.getData();
    }
    this.getDataObject.correctAnswer = this.getOptionData(option);
    return this.getDataObject;
  }

  getOptionData(option: QuestionOption[]): string {
    let answer = '';
    let optionNo = 'option';
    for (let i = 0; i < 4; i++) {
      optionNo = optionNo + String(i + 1);
      if (i < option.length) {
        this.getDataObject[optionNo] = option[i].optionValue;
        if (option[i].optionStatus == true) {
          answer += '1';
        }
        else {
          answer += '0';
        }
      }
      else{
        this.getDataObject[optionNo] = 'Not Define';
        answer += 'N';
      }
      optionNo = 'option';
    }

    return answer;
  }

  setPoints():void{
    switch (this.selectedLevel) {
      case this.difficultyLevel[0]:
        this.points = "2";  //Easy
        break;
      case this.difficultyLevel[1]:
        this.points = "4"; //Medium
        break;
      case this.difficultyLevel[2]:
        this.points = "6"; //Hard
        break;
      default:
        this.points = "10"
        break;
    }
  }

}
