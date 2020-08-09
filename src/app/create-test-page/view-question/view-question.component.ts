import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import data from '../view-question/test-dummy-data.json';
import { DataService } from '../service/data-service.service';
import { v4 as uuidv4 } from 'uuid';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { HttpServiceService } from '../service/http-service.service';
import { TestModel, QuestionBank, ModifiedQuestionBank, QuestionOption, TestUpdateDto, DifficultyLevel } from '../models/test-model.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { AppConstants } from '../../shared/constants/AppConstants';
import { from } from 'rxjs';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.scss']
})
export class ViewQuestionComponent implements OnInit {

  testId: string;

  testName: string;
  testPurpose: string;
  testRound: string;
  //Show test Data
  showTestName: string;
  showTestPurpose: string;
  showTestRound: string;
  selectedOption:string;
  //testType
  testTypelist: string[] = AppConstants.testPurpose;

  newTopic: string;
  testTopic: string[] = AppConstants.testTopic;
  newSelectedTopic: string;  
  filterSelectedTopic: string;
  questionsAvailable:boolean;

  //QuestionType
  questionType: string[] = AppConstants.questionType;
  selectedType: string;
  filter: string;

  //Difficulty Level
  difficultyLevel:DifficultyLevel = new DifficultyLevel(); 

  //modified Question
  modifiedQuestionBank: Array<ModifiedQuestionBank> = [];
  //filtered question
  filterQuestionOfTopic: Array<ModifiedQuestionBank> = [];

  //edit form group
  editTestForm: FormGroup;


  newQuestion: ModifiedQuestionBank = new ModifiedQuestionBank();
  testModel: TestModel;
  addTopicForm: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _dataService: DataService,
    private fb: FormBuilder,
    private _location: Location,
    private httpService: HttpServiceService,
    private cdr: ChangeDetectorRef,
    private notifyService:NotificationsService
  ) {
  }


  ngOnInit(): void {

    //Default
    this.newTopic = '';
    this.newSelectedTopic = this.testTopic[0];
    this.filterSelectedTopic = this.testTopic[0];
    this.questionsAvailable = false;
    this.selectedType = this.questionType[0];


    //Fetch data Using Http Request
    this.testModel = this.route.snapshot.data.httpData;
    this.testId = this.testModel.testId;
    this.testName = this.testModel.testName;
    this.testPurpose = this.testModel.testPurpose;
    this.testRound = this.testModel.testRound;
    //show data
    this.showTestName = this.testName;
    this.showTestPurpose = this.testPurpose;
    this.showTestRound = this.testRound;
    //Add topic form Validator 
    this.addTopicForm = this.fb.group({
      newTopic: new FormControl('', [Validators.required, Validators.minLength(1)])
    })
    //edit test form validator
    this.editTestForm = this.fb.group({
      testName: new FormControl('', [Validators.required, Validators.minLength(1)]),
      testRound: new FormControl('', [Validators.required, Validators.minLength(1)]),
      testPurpose: new FormControl('', Validators.required),
    })

    //Dto for QuestionBank to 
    this.mapQuestionBank();
    //FilterQuestion
    this.filterQuestion();

  }

  mapQuestionBank(): void {
    let questionBank = this.testModel.tblQuestionBanks;
    for (let i = 0; i < questionBank.length; i++) {
      var modifiedQuestion = new ModifiedQuestionBank();
      modifiedQuestion.id = questionBank[i].id;
      modifiedQuestion.question = questionBank[i].question;
      modifiedQuestion.questionTopic = questionBank[i].questionTopic;
      modifiedQuestion.questionType = questionBank[i].questionType;
      modifiedQuestion.scoringPoints = questionBank[i].scoringPoints;
      //modifiedQuestion.testId = questionBank[i].testId;
      modifiedQuestion.difficultyLevel = questionBank[i].difficultyLevel;

      switch(questionBank[i].difficultyLevel){
        case 'Easy':
          this.difficultyLevel.Easy++;
          break;
        case 'Medium':
          this.difficultyLevel.Medium++;
          break;
        case 'Hard':
          this.difficultyLevel.Hard++;
          break;
      }
      //Option 1
      if (questionBank[i].option1 != 'Not Define') {
        var modifiedOption = new QuestionOption();
        modifiedOption.optionId = '1';
        modifiedOption.optionValue = questionBank[i].option1;
        if (questionBank[i].correctAnswer[0] == '0') {
          modifiedOption.optionStatus = false;
        }
        else {
          modifiedOption.optionStatus = true;
        }
        modifiedQuestion.option.push(modifiedOption);
      }
      // Option 2
      if (questionBank[i].option2 != 'Not Define') {
        var modifiedOption = new QuestionOption();
        modifiedOption.optionId = '2';
        modifiedOption.optionValue = questionBank[i].option2;
        if (questionBank[i].correctAnswer[1] == '0') {
          modifiedOption.optionStatus = false;
        }
        else {
          modifiedOption.optionStatus = true;
        }
        modifiedQuestion.option.push(modifiedOption);
      }
      //Option 3
      if (questionBank[i].option3 != 'Not Define') {
        var modifiedOption = new QuestionOption();
        modifiedOption.optionId = '3';
        modifiedOption.optionValue = questionBank[i].option3;
        if (questionBank[i].correctAnswer[2] == '0') {
          modifiedOption.optionStatus = false;
        }
        else {
          modifiedOption.optionStatus = true;
        }
        modifiedQuestion.option.push(modifiedOption);
      }
      // Option 4
      if (questionBank[i].option4 != 'Not Define') {
        var modifiedOption = new QuestionOption();
        modifiedOption.optionId = '4';
        modifiedOption.optionValue = questionBank[i].option4;
        if (questionBank[i].correctAnswer[3] == '0') {
          modifiedOption.optionStatus = false;
        }
        else {
          modifiedOption.optionStatus = true;
        }
        modifiedQuestion.option.push(modifiedOption);
      }

      this.modifiedQuestionBank.push(modifiedQuestion);
    }
    //console.log(this.modifiedQuestionBank);
  }

  //Add new Topic to topic list
  addTopic(f: FormGroup, event) {
    event.hide(); //hide dialogbox

    this.testTopic.push(f.controls.newTopic.value); //Add topic to Topic list
    this.newTopic = ''; //reset
    //console.log(this.testTopic);
  }
  initializeNewQuestion(): void {
    this.newQuestion.questionType = this.selectedType;
    this.newQuestion.questionTopic = this.newSelectedTopic;
    this.newQuestion.id = uuidv4();
    this.newQuestion.difficultyLevel = '';
    this.newQuestion.option = null;
    this.newQuestion.question = '';
    this.newQuestion.scoringPoints = '';
    //this.newQuestion.testId = this.testId;
    //console.log(this.newQuestion);
  }
  //Add new Question 
  addQuestion(event) {
    event.hide(); //hide dialogbox
    this.initializeNewQuestion();
    //console.log(this.newQuestion);

    //Send data to child using Service
    this._dataService.setData(this.newQuestion);

    //Route to AddQuestion Section
    this.router.navigate(['/viewQuestion/addQuestion'], {
      queryParams: {
        'testId':this.testId,
        'edit': false
      }
    });
  }
  //filter Question of particular topic
  filterQuestion() {
    this.filterQuestionOfTopic = [];  //Reset
    //console.log(this.filterSelectedTopic);

    ;
    for (let i = 0; i < this.modifiedQuestionBank.length; i++) {
      if (this.modifiedQuestionBank[i].questionTopic == this.filterSelectedTopic) {
        this.filterQuestionOfTopic.push(this.modifiedQuestionBank[i]);
      }
    }
    if(this.filterQuestionOfTopic.length == 0){
      this.questionsAvailable = false;
    }
    else{
      this.questionsAvailable = true;
    }
  }

  //Edit Quuestion
  editQuestion(val): void {
    this._dataService.setData(val);
    //Route to AddQuestion Section
    this.router.navigate(['/viewQuestion/addQuestion'], {
      queryParams: {
        'testId':this.testId,
        'edit': true
      }
    });
  }
  onSubmitTestEdit(f: FormGroup, event) {
    event.hide();
    this.testName = f.controls.testName.value;
    this.testPurpose = f.controls.testPurpose.value;
    this.testRound = f.controls.testRound.value;
    //
    var testUpdateDto = new TestUpdateDto();
    testUpdateDto.testName = this.testName;
    testUpdateDto.testPurpose = this.testPurpose;
    testUpdateDto.testRound = this.testRound;

    //Update Test Using Http Request
    this.httpService.testUpdate(testUpdateDto, this.testId).subscribe(data=>{
      //console.log(data);
    },
    (err:HttpErrorResponse)=>{
      this.notifyService.showError("Something is wrong", "Error!");
    },
    ()=>{
      this.notifyService.showSuccess("You can proceed", "Test Edited successfully !!");
    }
    );

    //show Test data 
    this.showTestName = this.testName;
    this.showTestPurpose = this.testPurpose;
    this.showTestRound = this.testRound;
  }

  goToTests() {
    this._location.back();
  }

  AddQuestionsFromExcel() {
    this.router.navigate(
      ['/excel-upload'],
      {
        queryParams: {
          'id': this.testId
        }
      }
    )
  }

}
