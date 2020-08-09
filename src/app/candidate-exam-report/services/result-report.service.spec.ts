import { TestBed } from '@angular/core/testing';

import { ResultReportService } from './result-report.service';

describe('ResultReportService', () => {
  let service: ResultReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
