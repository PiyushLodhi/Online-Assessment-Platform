import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
import { NewQuestionComponent } from '../new-question/new-question.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data-service.service';
import { v4 as uuidv4 } from 'uuid';
import {Location} from '@angular/common';
import { ModifiedQuestionBank, QuestionBank, CreateQuestions } from '../models/test-model.model';
import { HttpServiceService } from '../service/http-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import {AppConstants} from '../../shared/constants/AppConstants';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  public testId:string;
  public counter: number = 0;
  public dataObject: QuestionBank[] = [];
  questionType: Array<string> = AppConstants.questionType;
  testTopic: Array<string> = AppConstants.testTopic;
  selectedType: string; 
  selectedTopic: string;  
  edit: boolean;
  btnstatus: string;
  questionId: string;
  map = new Map();
  btnEnable:boolean;

  showQuestionData:ModifiedQuestionBank = new ModifiedQuestionBank();


  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private _dataService: DataService,
    private _location: Location,
    private httpService: HttpServiceService,
    private router: Router,
    private notifyService:NotificationsService
  ) { }

  ngOnInit(): void {
    //Default
    this.selectedType = this.questionType[0];
    this.selectedTopic = this.testTopic[0];
    this.btnEnable = false;

    //get route parameter data
    let tempEdit = this.route.snapshot.queryParamMap.get('edit');
    this.testId = this.route.snapshot.queryParamMap.get('testId');
    if(tempEdit == 'true'){
      this.edit = true;
    }
    else{
      this.edit = false;
    }
    var getServiceData = this._dataService.getData();

    //Set State
    //this.testId = getServiceData.testId;
    this.questionId = getServiceData.id;
    this.selectedType = getServiceData.questionType;
    this.selectedTopic = getServiceData.questionTopic;
    if (!this.edit) {
      this.btnstatus = 'Save';
    }
    else {
      this.btnstatus = 'Update';
      this.initializeQuestion();
      
    }
    //console.log(this.showQuestionData);
  }
  initializeQuestion():void{
    if(this.edit){
      this.showQuestionData = this._dataService.getData();
    }
    else{
      //this.showQuestionData.testId = this.testId;
      this.showQuestionData.id = uuidv4();
      this.showQuestionData.question = null;
      this.showQuestionData.option = null;
      this.showQuestionData.difficultyLevel = 'Easy'; //default
      this.showQuestionData.questionTopic = this.selectedTopic; //default
      this.showQuestionData.questionType = this.selectedType; //default
      this.showQuestionData.scoringPoints = '2'; //default

    }
  }

  ngAfterViewInit() {
    this.addQuestion(null);
    this.cdr.detectChanges();
    //
  }

  addQuestion(event) {

    //debugger;
    if (event) {
      event.hide();
    }
    if (this.counter < 4) {
      if (!this.edit) {
        //Set default value
        this.initializeQuestion();
      }

      this.counter++;
      this.btnEnable = true;
      // Create component dynamically inside the ng-template
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NewQuestionComponent);
      const expComponent = this.container.createComponent(componentFactory);
      
      //put reference to map
      this.map.set(this.showQuestionData.id, expComponent);
      //interact to child
      expComponent.instance._ref = expComponent;
      expComponent.instance.parentId = this.showQuestionData.id//this.questionId;
      expComponent.instance.tempData = this.showQuestionData;//this.tempData;
      expComponent.instance.isEdit = this.edit;
      expComponent.instance.testId = this.testId; //Latest Added
      expComponent.instance.notifyParent.subscribe(val => {
        //delete reference from map
        this.map.delete(val);
        this.counter--;
        if(this.counter==0){
          this.btnEnable = false;
        }
      });
    }

  }
  saveQuestions(): void {
    for (let obj of this.map.values()) {
      this.dataObject.push(obj.instance.getData());
      obj.instance._ref.destroy();
      this.counter--;
    }
    if(this.counter==0){
      this.btnEnable = false;
    }
    //return this.dataObject;
    //console.log(this.dataObject);
    //If edit then Update Question else Add Questions
    if(this.edit){
      this.httpService.editQuestion(this.dataObject[0],this.dataObject[0].id).subscribe(data=>{
        //console.log(data);
      },
      (err:HttpErrorResponse)=>{
        this.notifyService.showError("Something is wrong", "Error!");
      },
      ()=>{
        this.dataObject = []; //set state
        this.map = new Map();
        this.notifyService.showSuccess("You can proceed", "Question Edited successfully !!");
      }
      );;
    }
    else{
      var createQuestions = new CreateQuestions();
      createQuestions.testId = this.testId;
      createQuestions.tblQuestionBanks = this.dataObject;
      this.httpService.addQuestions(createQuestions).subscribe(data=>{
        //console.log(data);
      },
      (err:HttpErrorResponse)=>{
        this.notifyService.showError("Something is wrong", "Error!");
      },
      ()=>{
        this.dataObject = []; //set state
        this.map = new Map();
        this.notifyService.showSuccess("You can proceed", "Questions added successfully !!");
      }
      );;
    }
  }
  goToViewTest(){
    this._location.back();
  }
  goToTests(){
    this.router.navigate(['./test-page']);

  }

}
