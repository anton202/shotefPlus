import { TestBed } from '@angular/core/testing';

import { SubmitDelayService } from './submit-delay.service';

describe('SubmitDelayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubmitDelayService = TestBed.get(SubmitDelayService);
    expect(service).toBeTruthy();
  });
});
