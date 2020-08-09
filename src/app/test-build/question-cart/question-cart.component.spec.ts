import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCartComponent } from './question-cart.component';

describe('QuestionCartComponent', () => {
  let component: QuestionCartComponent;
  let fixture: ComponentFixture<QuestionCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
