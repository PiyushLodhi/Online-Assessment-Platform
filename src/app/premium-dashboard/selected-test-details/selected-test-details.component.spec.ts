import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedTestDetailsComponent } from './selected-test-details.component';

describe('SelectedTestDetailsComponent', () => {
  let component: SelectedTestDetailsComponent;
  let fixture: ComponentFixture<SelectedTestDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedTestDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedTestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
