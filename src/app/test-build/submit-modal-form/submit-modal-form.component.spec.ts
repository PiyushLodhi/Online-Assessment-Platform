import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitModalFormComponent } from './submit-modal-form.component';

describe('SubmitModalFormComponent', () => {
  let component: SubmitModalFormComponent;
  let fixture: ComponentFixture<SubmitModalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitModalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
