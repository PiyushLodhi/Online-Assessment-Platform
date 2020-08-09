import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { QuestionBank, CreateQuestions } from '../models/test-model.model';
import { HttpServiceService } from '../service/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data-service.service';
@Component({
  selector: 'app-excelupload',
  templateUrl: './excelupload.component.html',
  styleUrls: ['./excelupload.component.scss']
})
export class ExceluploadComponent implements OnInit {

  data: [][];
  editField: string;

  questionList: Array<any> = [];
  heading = ['id', 'question', 'option1', 'option2', 'option3', 'option4', 'correctAnswer', 'level', 'points', 'subject'];
  predinedlevels = ['easy', 'intermediate', 'hard'];
  predinedAnswer = ['a', 'b', 'c', 'd'];
  predifinedSubjects = ['Maths', 'Chemistry', 'Physics', 'Management', 'Coding', 'Machne Learning'];
  verified: boolean = false;
  errorinsheet: boolean = false;
  titlerror: boolean = false;
  excelQuestions:QuestionBank[] = [];
  testId:string;

  constructor(
    private httpService:HttpServiceService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.testId = this.route.snapshot.queryParamMap.get('id');
  }


  uploadedFile(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);

    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      //console.log(ws);
      this.titlerror = false;
      this.errorinsheet = false;
      this.verified = false;
      let data: [][];
      //this.questionList.pop()
      let tempheading = []; // USed  to handle columns in any order input by user

      data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));

      for (var x1 in data) {
        for (var x2 in this.heading) {
          if (this.heading.indexOf(data[x1][x2]) == -1)   //If all the columns are available  else error will be shown
          {
            this.titlerror = true;
            break;
          }
        }
        tempheading = data[x1];
        break;
      }
      //console.log(tempheading);

      // if no title error than only process questions
      if (!this.titlerror) {
        let counter = 0;
        for (var x1 in data) {
          //console.log(this.data[x1]);
          if (x1 == "0")   //title row skipped
            continue;

          let temp = {
            id: 0,
            question: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            correctAnswer: '',
            level: '',
            points: '',
            subject: '',
            haserror: false,
          };  //All specific fields by user
          for (var x2 in data[x1]) {

            let l = tempheading[x2];
            //console.log(data[x1][x2]);
            temp[l] = data[x1][x2];

          }
          temp['id'] = counter;

          //check for empty and undefined levels in sheet 
          for (var x2 in this.heading) {
            if (temp[this.heading[x2]] == '') {
              this.errorinsheet = true;
              temp['haserror'] = true;
            }
            if (this.heading[x2] == 'level') {
              if (this.predinedlevels.indexOf(temp[this.heading[x2]]) == -1) {
                temp['haserror'] = true;
                this.errorinsheet = true;
              }
            }
            if (this.heading[x2] == 'correctAnswer') {
              if (this.predinedAnswer.indexOf(temp[this.heading[x2]]) == -1) {
                temp['haserror'] = true;
                this.errorinsheet = true;
              }
            }

            if (this.heading[x2] == 'subject') {
              if (this.predifinedSubjects.indexOf(temp[this.heading[x2]]) == -1) {
                temp['haserror'] = true;
                this.errorinsheet = true;
              }
            }

            if (this.heading[x2] == 'points') {
              let n: Number = temp[this.heading[x2]];
              if (n < 0 || n > 10000) {
                temp['haserror'] = true;
                this.errorinsheet = true;
              }
            }
          }

          counter++;
          this.questionList.push(temp);
        }
        this.verifysheet();   //Finally verifies sheet of errors
        //console.log(this.questionList);
        let x = data.slice(1);
        //console.log(x);
      }

    };

    reader.readAsBinaryString(target.files[0]);

  }

  verifysheet() {
    let check = true;
    for (var x1 in this.questionList) {
      if (this.questionList[x1]['question'] == '')
        check = false;

      if (this.questionList[x1]['option1'] == '')
        check = false;

      if (this.questionList[x1]['option2'] == '')
        check = false;

      if (this.questionList[x1]['option3'] == '')
        check = false;

      if (this.questionList[x1]['option4'] == '')
        check = false;

      if (this.questionList[x1]['points'] == '')
        check = false;

      if (this.predinedlevels.indexOf(this.questionList[x1]['level']) == -1)
        check = false;

      if (this.predinedAnswer.indexOf(this.questionList[x1]['correctAnswer']) == -1)
        check = false;


      if (this.predifinedSubjects.indexOf(this.questionList[x1]['subject']) == -1)
        check = false;


      let n: Number = this.questionList[x1]['points'];
      if (n < 0 || n > 10000) {
        check = false;
      }
    }

    this.verified = check;
    this.errorinsheet = !check;
  }
  notvalidpoints(value) {
    let n: Number = value;
    if (n < 0 || n > 10000)
      return true;
    return false;
  }
  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.questionList[id][property] = editField;
    console.log(this.questionList);
    this.verifysheet();
  }

  remove(id: any) {
    this.questionList.splice(id, 1);
    console.log(this.questionList);
    this.verifysheet();
  }

  add() {

  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  onSubmit(){

    for(let i = 0;i<this.questionList.length;i++){
      var question = new QuestionBank();
      question.id = String(this.questionList[i]['id']);
      question.question = this.questionList[i]['question'];
      question.option1 = this.questionList[i]['option1'];
      question.option2 = this.questionList[i]['option2'];
      question.option3 = this.questionList[i]['option3'];
      question.option4 = this.questionList[i]['option4'];
      question.difficultyLevel = this.questionList[i]['level'];
      question.questionTopic = this.questionList[i]['subject'];
      question.questionType = 'Multichoice';
      let answer = '0000';
      if(this.questionList[i]['correctAnswer'] == 'a'){
        answer = '1000';
      }
      else if(this.questionList[i]['correctAnswer'] == 'b'){
        answer = '0100';
      }
      else if(this.questionList[i]['correctAnswer'] == 'c'){
        answer = '0010';
      }
      else{
        answer = '0001';
      }
      question.correctAnswer = answer;
      question.scoringPoints = this.questionList[i]['points'];
      //question.testId = this.testId;
      this.excelQuestions.push(question);
    }
    var createQuestion = new CreateQuestions();
    createQuestion.testId = this.testId;
    createQuestion.tblQuestionBanks = this.excelQuestions;
    this.httpService.addQuestions(createQuestion);

    //this._location.back();
    this.router.navigate(['./test-page']);
    console.log(this.questionList);
  }


}

