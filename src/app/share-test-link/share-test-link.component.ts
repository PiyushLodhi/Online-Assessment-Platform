import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { find, get, pull } from 'lodash';

import { FormBuilder, NgForm, FormGroup, FormControl } from '@angular/forms';
import { AppConstants } from '../shared/constants/AppConstants';
import { ShareTest } from '../create-test-page/models/test-model.model';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-share-test-link',
  templateUrl: './share-test-link.component.html',
  styleUrls: ['./share-test-link.component.scss'],
})
export class ShareTestLinkComponent implements OnInit {
  @ViewChild('tagInput') tagInputRef: ElementRef;
  @ViewChild('one') d1: ElementRef;

  @ViewChild('testDetailForm') testDetailForm: NgForm;
  shareData:ShareTest = new ShareTest();

  tags: string[] = ['html@gmail.com', 'Angular@gmail.com'];
  form: FormGroup;
  warningMessage: boolean = true;

  testPurposelist: string[] = AppConstants.testPurpose;

  defaultPurpose:string;
  errorMessage="";

  onSubmit() {
    console.log(this.testDetailForm.valid);
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
    this.shareData.testId = '121';
    console.log(this.shareData);

  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.defaultPurpose = this.testPurposelist[0]; 
    this.form = this.fb.group({
      tag: [undefined],
    });
  }

  hideMessage() {
    this.warningMessage = false;
  }

  focusTagInput(): void {
    this.tagInputRef.nativeElement.focus();
  }

  onKeyUp(event: KeyboardEvent): void {
    console.log(this.testDetailForm.valid);
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
    console.log(this.testDetailForm.valid);
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
    console.log(this.testDetailForm.valid);
    if (!!tag) {
      pull(this.tags, tag);
    } else {
      this.tags.splice(-1);
    }
  }
}
