import { TestBed } from '@angular/core/testing';

import { NavRoutesService } from './nav-routes.service';

describe('NavRoutesService', () => {
  let service: NavRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
