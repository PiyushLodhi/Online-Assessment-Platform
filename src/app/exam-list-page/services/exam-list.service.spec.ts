import { TestBed } from '@angular/core/testing';

import { ExamListService } from './exam-list.service';

describe('ExamListService', () => {
  let service: ExamListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
