import { TestBed } from '@angular/core/testing';

import { Token.IntercepterService } from './token.intercepter.service';

describe('Token.IntercepterService', () => {
  let service: Token.IntercepterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Token.IntercepterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
