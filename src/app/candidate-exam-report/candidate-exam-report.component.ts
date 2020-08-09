import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'; 
import { PerformanceData } from './models/result-report.model';
import { TopicPerformance } from './models/result-report.model';
import { SectionPerformance } from './models/result-report.model';
import { ResultReportService } from './services/result-report.service';
import { Router } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-candidate-exam-report',
  templateUrl: './candidate-exam-report.component.html',
  styleUrls: ['./candidate-exam-report.component.scss']
})

export class CandidateExamReportComponent implements OnInit {

  @ViewChild('htmlData') htmlData:ElementRef;
  isShowData:boolean = false;
  public showHideButtonName:any = 'Show Registration Details';
  cid : any;
  examId: any;

  constructor(private resultReportService: ResultReportService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let examId = parseInt(this.route.snapshot.paramMap.get('examId'));
    let candidateId  = parseInt(this.route.snapshot.paramMap.get('candidateId'));
    this.examId = examId;
    this.cid = candidateId;

    //this.getPerformanceData();

  }

  toggle() {
    this.isShowData = !this.isShowData;

    if(this.isShowData)  
      this.showHideButtonName = "Hide Registration Details";
    else
      this.showHideButtonName = "Show Registration Details";
  }

  public chartType: string = 'pie';

  public chartDatasets: Array<any> = [
    { data: [1, 18, 1], label: 'My First dataset' }
  ];

  public chartLabels: Array<any> = ['Wrong', 'Right', 'Not Attempted'];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870'],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  getPerformanceData(): void {

    this.resultReportService.getPerformanceData(this.examId, this.cid)
        .subscribe(
          (resp) => {
            console.log(typeof(resp));
            console.log(resp);
            let resSTR = JSON.stringify(resp);
            let resJSON = JSON.parse(resSTR);
            console.log(resJSON.date);
            console.log(resJSON);
            
            // this.resultrowindex = 0;
            // for(var element in resJSON.data)
            // {
            //   console.log(resJSON.data[this.resultrowindex].candid)
            //   this.rowElements.push({ Id: resJSON.data[this.resultrowindex].candid, Name: resJSON.data[this.resultrowindex].firstName + " " + resJSON.data[this.resultrowindex].lastName, Email: resJSON.data[this.resultrowindex].email, Date: resJSON.date, Score: resJSON.data[this.resultrowindex].marks });
            //   this.resultrowindex = this.resultrowindex + 1;
            // }
            
        
          }, 
          err => {
          
            console.log(err);
        
          }
        );
  }


}
