import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateExamReportComponent } from './candidate-exam-report.component';

describe('CandidateExamReportComponent', () => {
  let component: CandidateExamReportComponent;
  let fixture: ComponentFixture<CandidateExamReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateExamReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateExamReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
