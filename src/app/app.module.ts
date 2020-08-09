import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FlexLayoutModule } from '@angular/flex-layout';

/************************************** */
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import {MatSelectModule} from '@angular/material/select';
/************************************** */
// Imported Syncfusion RichTextEditorModule from Rich Text Editor package
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import {MatExpansionModule} from '@angular/material/expansion';
//Component
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TestCardComponent } from './create-test-page/test-card/test-card.component';
import { CheckboxComponent } from './create-test-page/new-question/checkbox/checkbox.component';
import { MultipleChoiceComponent } from './create-test-page/new-question/multiple-choice/multiple-choice.component';
import { ShortAnswerComponent } from './create-test-page/new-question/short-answer/short-answer.component';
import { LongAnswerComponent } from './create-test-page/new-question/long-answer/long-answer.component';
import { SanitizePipe } from './sanitize.pipe';
import { EditorBoxComponent } from './create-test-page/new-question/editor-box/editor-box.component';
import { CheckboxOptionComponent } from './create-test-page/new-question/checkbox/checkbox-option/checkbox-option.component';
import { MultichoiceOptionComponent } from './create-test-page/new-question/multiple-choice/multichoice-option/multichoice-option.component';
import {QuestionBoxComponent} from './create-test-page/new-question/question-box/question-box.component';
import { ViewQuestionComponent } from './create-test-page/view-question/view-question.component';
import { AddQuestionComponent } from './create-test-page/add-question/add-question.component';
import { CreateTestPageComponent } from './create-test-page/create-test-page.component';
/******************* */

//Home page Component
import {HomeComponent} from './home/home.component';
import { HomeNavbarComponent } from './home/home-navbar/home-navbar.component';
import { HomeFooterComponent } from './home/home-footer/home-footer.component';
import { HomeContentComponent } from './home/home-content/home-content.component';
import { AboutComponent } from './home/about/about.component';
import { ContactComponent } from './home/contact/contact.component';


// Test Executation Page for  Candiadate Side
import { QuestionListComponent } from './test-execute/question-list/question-list.component';
import {QuestionComponent} from './test-execute/question/question.component';
import {ExamStatComponent} from './test-execute/exam-stat/exam-stat.component';
/******************* */

// Test Results view for Client side 
import { TestResultsComponent } from './test-results/test-results.component';


// Global State : 
import {StoreModule} from '@ngrx/store'
import {testExecuteReducer} from './store/reducers/test-execute.reducer';
import { testInstructionReducer } from './store/reducers/test-inst.reducer';
import { testBuildReducer } from './store/reducers/test-build.reducer';
/******************* */

import { DecodePipePipe, IntToStringPipe} from './create-test-page/decode-data-pipe/decode-pipe.pipe';
import { DataService} from './create-test-page/service/data-service.service';
import { NewQuestionComponent } from './create-test-page/new-question/new-question.component';
import { SamplePageComponent } from './sample-page/sample-page.component';
import { SelectedTestDetailsComponent} from './premium-dashboard/selected-test-details/selected-test-details.component';




//Test Build : Create Test from Nykinsky Question Bank
import { TestBuildComponent } from './test-build/test-build.component';
import { DashboardComponent } from './test-build/dashboard/dashboard.component';
import { SelectQuesComponent } from './test-build/select-ques/select-ques.component';
import { QuestionCartComponent } from './test-build/question-cart/question-cart.component';
import { SearchBoxComponent } from './test-build/search-box/search-box.component';
import { PaginationComponent } from './test-build/pagination/pagination.component';
import { HighlightSearch } from './test-build/select-ques/highlight.pipe';
import { TestBuildFormComponent } from './test-build/test-build-form/test-build-form.component';
import { QuesBoxComponent } from './test-build/ques-box/ques-box.component';

import { SubmitModalFormComponent } from './test-build/submit-modal-form/submit-modal-form.component';
import { ShareTestLinkComponent } from './share-test-link/share-test-link.component';


//Date and Time picker 

 

//Loader and Routing Resolve for handling httpRequests
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderService } from './shared/services/loader.service';
import { LoaderInterceptorService } from './shared/interceptors/loader-interceptor.service';
import { routingResolve } from './create-test-page/service/router.resolve';

//Notifications
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { RecaptchaModule } from 'ng-recaptcha';
import { ExamListPageComponent } from './exam-list-page/exam-list-page.component';
import { CandidateExamReportComponent } from './candidate-exam-report/candidate-exam-report.component';
import { PremiumDashboardComponent } from './premium-dashboard/premium-dashboard.component';
import { PremiumCardComponent } from './premium-dashboard/premium-card/premium-card.component';
import { TestFilterPipe } from './premium-dashboard/testFilter/test-filter.pipe';
import { RazorpayComponent } from './auth/components/razorpay/razorpay.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TestCardComponent,
    CheckboxComponent,
    MultipleChoiceComponent,
    ShortAnswerComponent,
    LongAnswerComponent,
    SanitizePipe,
    IntToStringPipe,
    QuestionComponent,
    EditorBoxComponent,
    CheckboxOptionComponent,
    MultichoiceOptionComponent,
    QuestionListComponent,
    ExamStatComponent,
    routingComponents,
    DecodePipePipe,
    QuestionBoxComponent,
    ViewQuestionComponent,
    NewQuestionComponent,
    AddQuestionComponent,
    CreateTestPageComponent,
    SamplePageComponent,
    TestResultsComponent,
    HomeComponent,

    //Test Build : Create Test from Nykinsky Question Bank
    TestBuildComponent ,
    DashboardComponent ,
    PaginationComponent ,
    SelectQuesComponent ,
    QuestionCartComponent,
    SearchBoxComponent ,
    HighlightSearch,

    TestBuildFormComponent,
    QuesBoxComponent,
    SubmitModalFormComponent,
    ShareTestLinkComponent ,


    

  

    
    //Loader component
    LoaderComponent,
    
    //Home page related components
    HomeNavbarComponent,
    HomeFooterComponent,
    HomeContentComponent,
    AboutComponent,
    ContactComponent,
    ExamListPageComponent,
    CandidateExamReportComponent,
    PremiumDashboardComponent,
    PremiumCardComponent,
    TestFilterPipe,
    SelectedTestDetailsComponent,
    RazorpayComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    RichTextEditorModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    RecaptchaModule,
    StoreModule.forRoot({ testExecute:testExecuteReducer , testBuild:testBuildReducer}),
  
    StoreModule.forRoot({ textExecute:testExecuteReducer}),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    }),
    StoreModule.forRoot({ testExecute:testExecuteReducer , testBuild:testBuildReducer , testInst : testInstructionReducer}),

    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    Ng2SearchPipeModule,
    FlexLayoutModule,
    MatExpansionModule,
    
  ],
  providers: [
    DataService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
    routingResolve
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
