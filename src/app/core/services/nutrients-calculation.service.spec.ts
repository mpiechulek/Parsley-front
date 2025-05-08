import { TestBed } from '@angular/core/testing';

import { NutrientsCalculationService } from './nutrients-calculation.service';

describe('NutrientsCalculationService', () => {
  let service: NutrientsCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutrientsCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
