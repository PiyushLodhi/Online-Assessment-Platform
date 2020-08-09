import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver,Input,ChangeDetectorRef } from '@angular/core';
import { CheckboxOptionComponent } from './checkbox-option/checkbox-option.component';
import { v4 as uuidv4 } from 'uuid';
import { QuestionOption } from '../../models/test-model.model';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() tempData:QuestionOption[];
  public counter: number = 0;
  public optionData:QuestionOption[] = []; 
  map = new Map();
  optionId:string;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    //this.addOption();
    if(this.tempData == null){
      this.addOption(false);
    }
    else{
      for(let i=0;i<this.tempData.length;i++){
        this.optionId = this.tempData[i].optionId;
        this.addOption(true);
      }
    }
    this.cdr.detectChanges();
  }
  addOption(edit) {
    //console.log('clicked');

    if (this.counter < 4) {
      //check if it is edit
      if (!edit) {
        this.optionId = uuidv4();
        var questionOption = new QuestionOption();
        questionOption.optionId = this.optionId
        questionOption.optionStatus = false;
        questionOption.optionValue = btoa('Option');
        this.tempData = [];
        this.tempData.push(questionOption);
      }
      //debugger;
      this.counter++;
      // Create component dynamically inside the ng-template
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CheckboxOptionComponent);
      const expComponent = this.container.createComponent(componentFactory);

      //store the reference
      this.map.set(this.optionId,expComponent);

      //interact to child
      expComponent.instance._ref = expComponent;
      expComponent.instance.optionId = this.optionId;
      if(edit){
        
        expComponent.instance.tempData = this.tempData[this.counter-1];
      }
      else{
        expComponent.instance.tempData = this.tempData[0];
      }
      expComponent.instance.notifyParent.subscribe(val => {
        this.map.delete(val);
        this.counter--;
      });
    }


  }
  getData() :QuestionOption[]{
    for (let obj of this.map.values()) {
      this.optionData.push(obj.instance.getData());
    }
    return this.optionData;
  }



}
