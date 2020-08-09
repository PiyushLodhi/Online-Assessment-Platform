import { Component, OnInit , ViewChild ,  } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-test-build-form',
  templateUrl: './test-build-form.component.html',
  styleUrls: ['./test-build-form.component.scss']
})
export class TestBuildFormComponent implements OnInit {

  testPurposelist: string[] = ['Purpose1','Purpose2','Purpose3','Purpose4'];
  
  defaultPurpose = 'Purpose1';

  @ViewChild('testDetailForm') testDetailForm: NgForm;


  onSubmit(){
    console.log(this.testDetailForm);
  }
  
  
  constructor() {
   
   }

  ngOnInit(): void {
   
   
  }

}
