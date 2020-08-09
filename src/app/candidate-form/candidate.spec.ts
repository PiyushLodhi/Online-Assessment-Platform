import { Candidate } from './candidate';

describe('Candidate', () => {
  it('should create an instance', () => {
    expect(new Candidate(null, null, null, null, null, null, null)).toBeTruthy();
  });
});
