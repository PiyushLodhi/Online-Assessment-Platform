import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionBoxComponent } from './question-box.component';

describe('QuestionBoxComponent', () => {
  let component: QuestionBoxComponent;
  let fixture: ComponentFixture<QuestionBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
