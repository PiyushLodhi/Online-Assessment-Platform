import { Component, OnInit, Input } from '@angular/core';

import {
  TestBuildQuestionModal
  
} from '../../store/models/test-build.model';

@Component({
  selector: 'app-ques-box',
  templateUrl: './ques-box.component.html',
  styleUrls: ['./ques-box.component.scss']
})
export class QuesBoxComponent implements OnInit {

  constructor() { }

  @Input() ques :TestBuildQuestionModal ;

  ngOnInit(): void {
  }

}
