import { Component, OnInit,Input,Output,EventEmitter, ViewChild,ChangeDetectorRef  } from '@angular/core';
import{ EditorBoxComponent} from '../../editor-box/editor-box.component';
import { MatRadioButton } from '@angular/material/radio';
import { QuestionOption } from 'src/app/create-test-page/models/test-model.model';

@Component({
  selector: 'app-multichoice-option',
  templateUrl: './multichoice-option.component.html',
  styleUrls: ['./multichoice-option.component.scss']
})
export class MultichoiceOptionComponent implements OnInit {

  //Interaction with parent
  _ref: any;
  @Input() tempData:QuestionOption;
  @Input() optionId:string;
  @Output() notifyParent: EventEmitter<string> = new EventEmitter<string>();
  //Interaction with the child
  @ViewChild(EditorBoxComponent) editor;
  @ViewChild('status') radiobutton:MatRadioButton;

  checked:boolean = false;
  dataObject:QuestionOption = new QuestionOption();

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    
  }
  ngAfterViewInit(){
    
    this.radiobutton.checked = this.tempData.optionStatus;
    this.cdr.detectChanges();
  }

  matStatus(){
    //console.log(this.radiobutton.checked);
  }
  removeOption(){
    //console.log('remove option');
    this.notifyParent.emit(this.optionId);
    this._ref.destroy();
  }
  getData():Object{
    this.dataObject.optionId = this.optionId;
    this.dataObject.optionValue = this.editor.getData();
    this.dataObject.optionStatus= this.radiobutton.checked
    return this.dataObject;
  }

}
