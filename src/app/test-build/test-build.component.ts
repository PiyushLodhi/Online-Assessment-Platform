import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-build',
  templateUrl: './test-build.component.html',
  styleUrls: ['./test-build.component.scss']
})
export class TestBuildComponent implements OnInit {

  constructor() { }

  step:number =3;
  topics: string[] = [
    'Java Core',
    'JavaScript Basic',
    'Programming',
    'General Knowledge',
    'Web Development',
    'Html & CSS',
    "Android Development" ,
    "Mathematics" ,
    "C Sharp "
  ];

  difficultyList: string[] =[
    'Easy' , 'Medium' , 'Hard' , 'Expert'
  ];

  typeList:string[] =[
    'Multiple' , 'Short-Ans' ,'Long-Ans' , 'Check-Box'
  ]


  ngOnInit(): void {
  }

}
