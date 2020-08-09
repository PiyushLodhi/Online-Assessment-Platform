import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/create-test-page/service/http-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-selected-test-details',
  templateUrl: './selected-test-details.component.html',
  styleUrls: ['./selected-test-details.component.scss']
})
export class SelectedTestDetailsComponent implements OnInit {

  public testId:string;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private httpService: HttpServiceService,
    private notifyService:NotificationsService,
    private _location: Location,
  ) { }

  ngOnInit(): void {
     this.testId= this.route.snapshot.queryParamMap.get('id');
  }
  importTest():void{
    this.httpService.importPremiumTest(this.testId).subscribe(data=>{
      //console.log(data);
    },
    (err:HttpErrorResponse)=>{
      this.notifyService.showError("Something is wrong", "Error!");
    },
    ()=>{
      //this.notifyService.showSuccess("You can proceed", "Question Edited successfully !!");
      //route to View or Edit Question Section
      this.router.navigate(['./test-page']);
    }
    );
    //console.log(this.testId);
  }

  goToTests() {
    this._location.back();
  }

}
