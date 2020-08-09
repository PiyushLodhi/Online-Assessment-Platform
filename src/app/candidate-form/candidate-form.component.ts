import { Component, OnInit } from '@angular/core';
import { Candidate } from './model/candidate';
import { CandidateFormService } from './services/candidate-form.service';
import { Router } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss']
})

export class CandidateFormComponent implements OnInit {

  candidate = new Candidate();
  submitted = false;
  public ExamID=1;
  emailCheckError:boolean=false;

  constructor(private candidateFormService: CandidateFormService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let examId = parseInt(this.route.snapshot.paramMap.get('examId'));
    this.ExamID = examId;
    //this.ExamID =1;
  }

  onSubmit() {
    //console.log(this.candidate)
    this.submitted = true;
    this.candidate.ExamId = this.ExamID;

    this.candidateFormService.addCandidate(this.candidate)
      .subscribe(
        (response) => {
           console.log(response); 
          let resSTR = JSON.stringify(response);
          let resJSON = JSON.parse(resSTR);
          
          sessionStorage.setItem('token', resJSON.token);
          localStorage.setItem('candId',resJSON.candidateId  ) ;
          localStorage.setItem('examId' , this.ExamID.toString());
          this.router.navigate(['/test-instruction', this.ExamID, resJSON.candidateId])
         },
        (error) => {
          this.emailCheckError=true;
          console.log(error)

        }
        
      )
  }

}
