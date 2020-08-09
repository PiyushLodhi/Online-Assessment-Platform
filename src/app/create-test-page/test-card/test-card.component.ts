import { Component, OnInit,Input,Output,EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { TestModel, ShareTest } from '../models/test-model.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { HttpServiceService } from '../service/http-service.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { AppConstants } from 'src/app/shared/constants/AppConstants';
import { find, get, pull } from 'lodash';

@Component({
  selector: 'app-test-card',
  templateUrl: './test-card.component.html',
  styleUrls: ['./test-card.component.scss']
})
export class TestCardComponent implements OnInit {

  

  _ref: any;
  @Input() parentId:string;
  @Input() testData:TestModel;
  @Output() notifyParent: EventEmitter<string> = new EventEmitter<string>();


  /*Start*/ 
  @ViewChild('tagInput') tagInputRef: ElementRef;
  @ViewChild('one') d1: ElementRef;

  @ViewChild('testDetailForm') testDetailForm: NgForm;
  shareData:ShareTest = new ShareTest();
  isPremium:boolean;

  tags: string[] = ['html@gmail.com', 'Angular@gmail.com'];
  form: FormGroup;
  warningMessage: boolean = true;

  testPurposelist: string[] = AppConstants.testPurpose;

  defaultPurpose:string;
  myDuration:string;
  errorMessage="";
  /*end*/


  constructor(
    private router: Router,
    private notifyService: NotificationsService,
    private httpService: HttpServiceService,
    private activatedRoute:ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.defaultPurpose = this.testPurposelist[0]; 
    this.form = this.fb.group({
      tag: [undefined],
    });
    this.isPremium = this.testData.isPremium;
    //console.log(this.testData);
  }

  removeTest(){
    //this.confirmClicked = true;
    this.httpService.deleteTest(this.parentId).subscribe(data =>{
      //console.log(data);
    },
    (err:HttpErrorResponse)=>{
      this.notifyService.showError("Something is wrong", "Error!");
    },
    ()=>{
      //console.log('remove question');
      this.notifyParent.emit(this.parentId);
      this._ref.destroy();
      this.notifyService.showWarning("You can proceed", "Test Deleted successfully !!");
    }
    );
  }

  editTest():void{
    this.router.navigate(['./viewQuestion'],
        {
          queryParams: {
            'id': this.parentId, 
            'edit':true
          }
        }
      );
  }

  OpenTest():void{
    this.router.navigate(['./exams'],
      {
        queryParams:{
        'testId':this.parentId
        }
      }

    )
  }
  shareTest(){
    //Http Request
    this.httpService.shareTest(this.shareData).subscribe(data => {
      //console.log(data);
    },
      (err: HttpErrorResponse) => {
        this.notifyService.showError("Something is wrong", "Error!");

      },
      () => {
        this.notifyService.showSuccess("You can proceed", "Test shared successfully !!");
      }
    );
  }

  viewTest(){
    
  }
  onSubmit(event) {
    event.hide();
    //console.log(this.testDetailForm.valid);
    let email = '';
    for(let i=0;i<this.tags.length;i++){
      email += this.tags[i]+',';
    }
    this.shareData.candidateEmail = email;
    this.shareData.date = this.testDetailForm.form.value.datetimepicker;
    this.shareData.duration = this.testDetailForm.form.value.testDuration;
    if(this.testDetailForm.form.value.negativeYes == undefined){
      this.shareData.negBool = 1;
    }
    else{
      this.shareData.negBool = 0;
    }
    this.shareData.sectionA = this.testDetailForm.form.value.Easy;
    this.shareData.sectionB = this.testDetailForm.form.value.Medium;
    this.shareData.sectionC = this.testDetailForm.form.value.Hard;
    this.shareData.testId = this.parentId;
    //console.log(this.shareData);
    this.shareTest();

  }
  hideMessage() {
    this.warningMessage = false;
  }

  focusTagInput(): void {
    this.tagInputRef.nativeElement.focus();
  }

  onKeyUp(event: KeyboardEvent): void {
    //console.log(this.testDetailForm.valid);
    const inputValue: string = this.form.controls.tag.value;
    if (event.code === 'Backspace' && !inputValue) {
      //this.removeTag();
      return;
    } else {
      if (event.code === 'Comma' || event.code === 'Space') {
        this.addTag(inputValue);
        this.form.controls.tag.setValue('');
      }
    }
  }

  addTag(tag: string): void {
    //console.log(this.testDetailForm.valid);
    if (tag[tag.length - 1] === ',' || tag[tag.length - 1] === ' ') {
      tag = tag.slice(0, -1);

      if (this.must_be_email(tag) ) {
        if(!this.tags.includes(tag))
        this.tags.push(tag);
        else{
          this.errorMessage= "Email: ' " + tag +" ' Already Added";
          setTimeout(()=> {this.errorMessage=""}, 2000);

        }
      }
     
    }
  }

  must_be_email(tags: string) {
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (tags === '' || tags.length <= 6) {
      this.errorMessage= "Email: ' " +tags +" ' length must be more than 6";
     setTimeout(()=> {this.errorMessage=""}, 2000);
      return false;
    }

    if (EMAIL_REGEXP.test(tags.toLowerCase())) {
      return true;
    } else {
      this.errorMessage= "Email: ' " +tags +" ' is not a proper email format ";
      setTimeout(()=> {this.errorMessage=""}, 2000);
      return false;
    }
  }

  removeTag(tag?: string): void {
    //console.log(this.testDetailForm.valid);
    if (!!tag) {
      pull(this.tags, tag);
    } else {
      this.tags.splice(-1);
    }
  }

}
