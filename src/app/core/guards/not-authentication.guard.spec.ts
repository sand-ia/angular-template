import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { NotAuthenticationGuard } from './not-authentication.guard';

describe('notAuthenticationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => NotAuthenticationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
