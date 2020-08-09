import { Component, OnInit} from '@angular/core';
import { ExamModel } from './models/exam.model';
import { ExamListService } from './services/exam-list.service';
import { Router, ActivatedRoute } from '@angular/router'; 
import { Location } from '@angular/common';

@Component({
  selector: 'app-exam-list-page',
  templateUrl: './exam-list-page.component.html',
  styleUrls: ['./exam-list-page.component.scss']
})

export class ExamListPageComponent implements OnInit{

  examList: ExamModel[];
  
  //public clientId = "1" ; // remove hard coded value when intergration is done
  public testId  = "1";   // remove hard coded value when intergration is done
  public examId;
  constructor(private examListService: ExamListService, private router: Router,private route:ActivatedRoute,private _location: Location) { }

  ngOnInit(): void {
  
    this.testId = this.route.snapshot.queryParamMap.get('testId');

    this.getExamList();

  }

  onSelect(examId): void {
    this.examId = examId;
    this.router.navigate(['/test-results', this.examId]);

  }

  getExamList(): void {

    this.examListService.getExamList(this.testId)
        .subscribe(
          (resp) => {
          
            console.log(resp);
            this.examList = resp;
        
          }, 
          err => {
          
            console.log(err);
        
          }
        );
  }
  goToTests():void{
    this._location.back();
  }
  
}