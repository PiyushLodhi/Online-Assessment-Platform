import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuesBoxComponent } from './ques-box.component';

describe('QuesBoxComponent', () => {
  let component: QuesBoxComponent;
  let fixture: ComponentFixture<QuesBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuesBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
