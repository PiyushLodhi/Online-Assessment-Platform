import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareTestLinkComponent } from './share-test-link.component';

describe('ShareTestLinkComponent', () => {
  let component: ShareTestLinkComponent;
  let fixture: ComponentFixture<ShareTestLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareTestLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareTestLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
