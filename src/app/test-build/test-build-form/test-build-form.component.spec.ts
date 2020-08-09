import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBuildFormComponent } from './test-build-form.component';

describe('TestBuildFormComponent', () => {
  let component: TestBuildFormComponent;
  let fixture: ComponentFixture<TestBuildFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestBuildFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestBuildFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
