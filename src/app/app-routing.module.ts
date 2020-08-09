import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { ResetpasswordComponent } from './auth/components/resetpassword/resetpassword.component';
import { OtpverificationComponent } from './auth/components/otpverification/otpverification.component';
import { ResetpasswordotpverifyComponent } from './auth/components/resetpasswordotpverify/resetpasswordotpverify.component';
import { NewpasswordComponent } from './auth/components/newpassword/newpassword.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';

import { InstructionPageComponent } from './instruction-page/instruction-page.component';
import { ThankyouPageComponent } from './thankyou-page/thankyou-page.component';
import { TestExecuteComponent } from './test-execute/test-execute.component';
import { ViewQuestionComponent } from './create-test-page/view-question/view-question.component';
import { AddQuestionComponent } from './create-test-page/add-question/add-question.component';
import { CreateTestPageComponent } from './create-test-page/create-test-page.component';
import { SamplePageComponent } from './sample-page/sample-page.component';
import { TestBuildComponent } from './test-build/test-build.component';

import { QuestionCartComponent } from './test-build/question-cart/question-cart.component';
import { ShareTestLinkComponent } from './share-test-link/share-test-link.component';

import { TestResultsComponent } from './test-results/test-results.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './home/about/about.component';
import {ContactComponent} from './home/contact/contact.component';
import { RouterResolve, getRoleResolve, getTestByIdRouterResolve, getPremiumTestResolve } from './create-test-page/service/router.resolve';


import { ExceluploadComponent } from './create-test-page/excelupload/excelupload.component';
import { AuthguardGuard } from './auth/authguard.guard';
import { PremiumDashboardComponent } from './premium-dashboard/premium-dashboard.component';
import { SelectedTestDetailsComponent } from './premium-dashboard/selected-test-details/selected-test-details.component';
import { RazorpayComponent } from './auth/components/razorpay/razorpay.component';

import { ExamListPageComponent } from './exam-list-page/exam-list-page.component';
import { CandidateExamReportComponent } from './candidate-exam-report/candidate-exam-report.component';

const routes: Routes = [
  { path: '', component: SamplePageComponent },
  {
    path: 'test-page',
    component: CreateTestPageComponent,
    resolve: { httpData: RouterResolve },
    canActivate: [AuthguardGuard],
  },
  {
    path: 'premiumTests/premiumTestDetails',
    component: SelectedTestDetailsComponent,
  },
  {path:'premiumTests/premiumTestDetails',component:SelectedTestDetailsComponent},
  {
    path:'premiumTests',
    component:PremiumDashboardComponent,
    resolve:{httpData:getPremiumTestResolve}
  },
  { path: 'premiumTests', component: PremiumDashboardComponent },

  { path: 'login', component: LoginComponent },
  {
    path: 'register',
    component: RegisterComponent,
    //resolve: { httpData: getRoleResolve }
  },
  { path: 'reset-password', component: ResetpasswordComponent },
  { path: 'otp-verification', component: OtpverificationComponent },
  { path: 'password-forgot-otp', component: ResetpasswordotpverifyComponent },
  { path: 'new-password', component: NewpasswordComponent },
  //////////////////
  {
    path: 'viewQuestion',
    component: ViewQuestionComponent,
    resolve: { httpData: getTestByIdRouterResolve },
    canActivate: [AuthguardGuard],
  },
  {
    path: 'viewQuestion/addQuestion',
    component: AddQuestionComponent,
    canActivate: [AuthguardGuard],
  },
  //////////
  {path:'test-results/:examId', component:TestResultsComponent},
  {path:'exams' , component: ExamListPageComponent},
  {path:'candidate-report/:examId/:candidateId' , component: CandidateExamReportComponent},
  /////////
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  //{path:"**",component:PageNotFoundComponent} //WildCard Route

  ////////////
  { path: 'test-execute', component: TestExecuteComponent },
  {
    path: 'test-instruction/:examId/:candidateId',
    component: InstructionPageComponent,
  },
  { path: 'test-thankyou', component: ThankyouPageComponent },
  { path: 'reg-candidate/:examId', component: CandidateFormComponent },

  { path: 'test-link-share', component: ShareTestLinkComponent },

  { path: 'test-build', component: TestBuildComponent },
  {
    path: 'excel-upload',
    component: ExceluploadComponent,
    canActivate: [AuthguardGuard],
  },
  { path: 'payment', component:RazorpayComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  PageNotFoundComponent,
  AddQuestionComponent,
  CreateTestPageComponent,
  ViewQuestionComponent,

  HomeComponent,
  LoginComponent,
  RegisterComponent,
  ResetpasswordComponent,
  OtpverificationComponent,
  ResetpasswordotpverifyComponent,
  NewpasswordComponent,
  ExceluploadComponent,

  CandidateFormComponent,
  TestExecuteComponent,
  InstructionPageComponent,
  ThankyouPageComponent,
  CandidateFormComponent,
  ExceluploadComponent,
];
