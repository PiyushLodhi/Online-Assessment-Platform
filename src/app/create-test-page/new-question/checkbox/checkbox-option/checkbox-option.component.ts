import { Component, OnInit,Input,Output,EventEmitter, ViewChild,ChangeDetectorRef } from '@angular/core';
import{ EditorBoxComponent} from '../../editor-box/editor-box.component';
import { QuestionOption } from 'src/app/create-test-page/models/test-model.model';

@Component({
  selector: 'app-checkbox-option',
  templateUrl: './checkbox-option.component.html',
  styleUrls: ['./checkbox-option.component.scss']
})
export class CheckboxOptionComponent implements OnInit {
  //Interaction with parent
  _ref: any;
  @Input() tempData:QuestionOption;
  @Input() optionId: string;
  @Output() notifyParent: EventEmitter<string> = new EventEmitter<string>();
  //Interaction with the child
  @ViewChild(EditorBoxComponent) editor;

  checked:boolean=false;
  dataObject:QuestionOption = new QuestionOption();

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    
  }
  ngAfterViewInit(){
    this.checked = this.tempData.optionStatus;
    this.cdr.detectChanges();
  }


  changeCheckboxValue(){
    this.checked = !this.checked;
    //console.log(this.checked);
  }
  removeOption(){
    //console.log('remove option');
    this.notifyParent.emit(this.optionId);
    this._ref.destroy();
  }
  getData():QuestionOption{
    this.dataObject.optionId = this.optionId;
    this.dataObject.optionValue = this.editor.getData();
    this.dataObject.optionStatus = this.checked;
    return this.dataObject;
  }
}
