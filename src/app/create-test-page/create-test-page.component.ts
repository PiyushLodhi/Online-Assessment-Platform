import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TestCardComponent } from './test-card/test-card.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TestModel } from './models/test-model.model';
import { HttpServiceService } from './service/http-service.service';
import { v4 as uuidv4 } from 'uuid';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NotificationsService } from '../shared/services/notifications.service';
import { AppConstants } from '../shared/constants/AppConstants';
import { AuthservicesService } from '../auth/services/authservices.service';


@Component({
  selector: 'app-create-test-page',
  templateUrl: './create-test-page.component.html',
  styleUrls: ['./create-test-page.component.scss']
})
export class CreateTestPageComponent implements OnInit {



  selectedType: string;
  testName: string;
  testRound: string;
  //Initialize Object
  testObj: TestModel = new TestModel();
  Tests: TestModel[];

  counter: number = 0;
  testTypelist: string[] = AppConstants.testPurpose;
  purpose: string = '';
  //form validation
  createTestForm: FormGroup;


  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef,
    private httpService: HttpServiceService,
    private route: ActivatedRoute,
    private notifyService: NotificationsService,
    private httpAuthService:AuthservicesService
  ) { }

  ngOnInit(): void {
    this.Tests = this.route.snapshot.data.httpData;
    this.createTestForm = this.fb.group({
      testName: new FormControl('', [Validators.required, Validators.minLength(1)]),
      testRound: new FormControl('', [Validators.required, Validators.minLength(1)]),
      purpose: new FormControl('', Validators.required)
    });

  }

  ngAfterViewInit() {
    for (let i = 0; i < 8; i++) {
      this.showTest();
    }
    this.cdr.detectChanges();
    this.cdr.markForCheck();
    //
  }


  showTest() {
    if (this.counter < 8 && this.counter < this.Tests.length) {
      this.counter++;
      // Create component dynamically inside the ng-template
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TestCardComponent);
      const expComponent = this.container.createComponent(componentFactory);
      //interact to child
      expComponent.instance._ref = expComponent;
      expComponent.instance.parentId = this.Tests[this.counter - 1].testId;//this.questionId;
      expComponent.instance.testData = this.Tests[this.counter - 1];
      expComponent.instance.notifyParent.subscribe(val => {
        //console.log('deleted: ' + val);
      },
      );
    }
  }

  onSubmit(f: FormGroup, event) {
    debugger
    //Hide the dialog frame
    event.hide();
    //Added Just Now
    this.testObj.testId = uuidv4();  //Random
    this.testObj.testName = f.controls.testName.value;
    this.testObj.testPurpose = f.controls.purpose.value;
    this.testObj.testRound = f.controls.testRound.value;

    //Reset State
    this.testName = '';
    this.purpose = '';

    //Http Request
    this.httpService.addTest(this.testObj).subscribe(data => {
      //console.log(data);
    },
      (err: HttpErrorResponse) => {
        this.notifyService.showError("Something is wrong", "Error!");

      },
      () => {
        //route to View or Edit Question Section
        this.router.navigate(['./viewQuestion'],
          {
            queryParams: {
              'id': this.testObj.testId,
              'edit': false
            }
          }
        );
      }
    );

  }

  addTestFromLibrary() {
    //this.notifyService.showSuccess("Test Created successfully !!", "You can proceed!");
  }
  addTestFromPremium(){
    let premium = false;
    //Http Request
    this.httpAuthService.isPremium().subscribe(data => {
      //console.log(data);
      premium = data;
    },
      (err: HttpErrorResponse) => {
        this.notifyService.showError("Something is wrong", "Error!");

      },
      () => {
        //route to View or Edit Question Section
        this.router.navigate(['./premiumTests']);
          
        //);
        /*if(premium){
          //Go To Premium Dashboard
          alert("yes");
        }
        else{
          alert('No');
          //Go To Premium pricing
        }*/
      }
    );
  }
}
