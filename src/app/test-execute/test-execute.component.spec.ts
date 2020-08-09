import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestExecuteComponent } from './test-execute.component';

describe('TestExecuteComponent', () => {
  let component: TestExecuteComponent;
  let fixture: ComponentFixture<TestExecuteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestExecuteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestExecuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
