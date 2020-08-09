import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Input, ChangeDetectorRef } from '@angular/core';
import { MultichoiceOptionComponent } from './multichoice-option/multichoice-option.component';
import { v4 as uuidv4 } from 'uuid';
import { QuestionOption } from '../../models/test-model.model';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss']
})
export class MultipleChoiceComponent implements OnInit {

  @Input() tempData: QuestionOption[];
  public counter: number = 0;
  public optionData: QuestionOption[] = [];
  map = new Map();
  optionId: string;

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.tempData == null) {
      this.addOption(false);
    }
    else {
      for (let i = 0; i < this.tempData.length; i++) {
        this.optionId = this.tempData[i].optionId;
        this.addOption(true);
        //console.log(i);
      }
    }
    this.cdr.detectChanges();
  }
  addOption(edit:boolean) {
    //console.log('clicked');

    if (this.counter < 4) {
      //check if edit or not
      if (!edit) {
        this.optionId = uuidv4();
        var questionOption = new QuestionOption();
        questionOption.optionId = this.optionId
        questionOption.optionStatus = false;
        questionOption.optionValue = btoa('Option');
        //console.log(questionOption);
        if(this.tempData == null){
          this.tempData = [];
          this.tempData.push(questionOption);
        }
      }
      //debugger;
      this.counter++;
      // Create component dynamically inside the ng-template
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MultichoiceOptionComponent);
      const expComponent = this.container.createComponent(componentFactory);
      //expComponent.changeDetectorRef.detectChanges();
      this.map.set(this.optionId,expComponent);

      //interact to child
      expComponent.instance._ref = expComponent;
      expComponent.instance.optionId =this.optionId;
      
      if (edit) {
        expComponent.instance.tempData = this.tempData[this.counter - 1];
      }
      else {
        expComponent.instance.tempData = this.tempData[0];
      }
      expComponent.instance.notifyParent.subscribe(val => {
        this.map.delete(val);
        this.counter--;
      });
    }


  }
  getData(): QuestionOption[] {
    for (let obj of this.map.values()) {
      this.optionData.push(obj.instance.getData());
    }
    return this.optionData;
  }

}
