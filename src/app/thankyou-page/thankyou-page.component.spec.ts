import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankyouPageComponent } from './thankyou-page.component';

describe('ThankyouPageComponent', () => {
  let component: ThankyouPageComponent;
  let fixture: ComponentFixture<ThankyouPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThankyouPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankyouPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
