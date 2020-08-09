import { Component, OnInit,ViewChild,Input } from '@angular/core';
import {EditorBoxComponent} from '../editor-box/editor-box.component';

@Component({
  selector: 'app-short-answer',
  templateUrl: './short-answer.component.html',
  styleUrls: ['./short-answer.component.scss']
})
export class ShortAnswerComponent implements OnInit {


  @Input() tempData:string;
  @ViewChild(EditorBoxComponent) editor;
  constructor() {
  }

  ngOnInit(): void {
    if(this.tempData==null){
      this.tempData = btoa('ShortAnswer');
    }
  }

  getData():string{
    return this.editor.getData();
  }
}
