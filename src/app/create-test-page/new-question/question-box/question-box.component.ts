import { Component, OnInit,ViewChild,ElementRef, Input } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import {EditorBoxComponent} from '../editor-box/editor-box.component';


@Component({
  selector: 'app-question-box',
  templateUrl: './question-box.component.html',
  styleUrls: ['./question-box.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService]
})
export class QuestionBoxComponent implements OnInit {

  
  @Input() tempData:string;
  //view editor
  @ViewChild(EditorBoxComponent) editor;
  constructor(){}

  ngOnInit(): void {
    //debugger;
    if(this.tempData == null){
      this.tempData = btoa('Question');
    }
    //console.log(this.tempData);
  }

  getData():string{
    return this.editor.getData();
  }

}
