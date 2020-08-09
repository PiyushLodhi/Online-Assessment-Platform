import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpasswordotpverifyComponent } from './resetpasswordotpverify.component';

describe('ResetpasswordotpverifyComponent', () => {
  let component: ResetpasswordotpverifyComponent;
  let fixture: ComponentFixture<ResetpasswordotpverifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetpasswordotpverifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpasswordotpverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
