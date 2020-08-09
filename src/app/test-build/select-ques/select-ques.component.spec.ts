import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectQuesComponent } from './select-ques.component';

describe('SelectQuesComponent', () => {
  let component: SelectQuesComponent;
  let fixture: ComponentFixture<SelectQuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectQuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectQuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
