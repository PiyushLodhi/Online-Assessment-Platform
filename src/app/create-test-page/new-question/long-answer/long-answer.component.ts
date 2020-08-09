import { Component, OnInit, ViewChild,Input } from '@angular/core';
import {EditorBoxComponent} from '../editor-box/editor-box.component';

@Component({
  selector: 'app-long-answer',
  templateUrl: './long-answer.component.html',
  styleUrls: ['./long-answer.component.scss']
})
export class LongAnswerComponent implements OnInit {

  @Input() tempData:string;

  @ViewChild(EditorBoxComponent) editor;

  constructor() { }

  ngOnInit(): void {
    if(this.tempData==null){
      this.tempData = btoa('Long Answer');
    }
  }

  getData():string{
    return this.editor.getData();
  }

}
