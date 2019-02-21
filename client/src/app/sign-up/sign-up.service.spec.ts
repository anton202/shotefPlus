import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { SignUpService } from './sign-up.service';

describe('SignUpService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [HttpClient]
  }));

  it('should be created', () => {
    const service: SignUpService = TestBed.get(SignUpService);
    expect(service).toBeTruthy();
  });
});
