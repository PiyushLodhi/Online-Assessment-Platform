import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RazorpayComponent } from './razorpay.component';

describe('RazorpayComponent', () => {
  let component: RazorpayComponent;
  let fixture: ComponentFixture<RazorpayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RazorpayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RazorpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
