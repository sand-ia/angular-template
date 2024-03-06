import { TestBed } from '@angular/core/testing';

import { SplitViewService } from './split-view.service';

describe('SplitViewService', () => {
  let service: SplitViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SplitViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
