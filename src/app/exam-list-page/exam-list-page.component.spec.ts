import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamListPageComponent } from './exam-list-page.component';

describe('ExamListPageComponent', () => {
  let component: ExamListPageComponent;
  let fixture: ComponentFixture<ExamListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
