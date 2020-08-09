import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBuildComponent } from './test-build.component';

describe('TestBuildComponent', () => {
  let component: TestBuildComponent;
  let fixture: ComponentFixture<TestBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
