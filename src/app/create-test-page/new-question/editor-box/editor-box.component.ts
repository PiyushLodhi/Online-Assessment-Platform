import { Component, OnInit,ViewChild,ElementRef,Input } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-editor-box',
  templateUrl: './editor-box.component.html',
  styleUrls: ['./editor-box.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService]
})
export class EditorBoxComponent implements OnInit {

  @Input() tempData:string;

  @ViewChild('inlineRTE') public rteObj: RichTextEditorComponent;
  constructor(private elRef: ElementRef) {
  }
  public inlineMode: object = { enable: true, onSelection: true };
  public toolbarSettings: Object = {
    items: ['Bold', 'Italic', 'Underline',
      'Formats', 'FontSize', 'BackgroundColor', '-', 'Alignments', 'OrderedList', 'UnorderedList',
      'CreateLink', 'Image']
  };
  public quickTools: object = {
    image: [
      'Replace', 'Align', 'Caption', 'Remove', 'InsertLink', '-', 'Display', 'AltText', 'Dimension']
  };
  public format: Object = {
    width: 'auto'
  };
  public fontFamily: Object = {
    width: 'auto'
  };




  ngOnInit(): void {
    
  }
  ngAfterViewInit(){
    this.rteObj.updateValue(atob(this.tempData))//atob(this.tempData)); to be change
  }

  getData():string{
    let myval = btoa(this.rteObj.value); //Encode the Html Content 
    //console.log(myval);
    return myval;
  }

}
