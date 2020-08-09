import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumDashboardComponent } from './premium-dashboard.component';

describe('PremiumDashboardComponent', () => {
  let component: PremiumDashboardComponent;
  let fixture: ComponentFixture<PremiumDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
