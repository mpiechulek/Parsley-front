import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from '@environments/environment.development';
import { FoodModel, FoodResponse } from '@models/food.model';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch food by ID', () => {
    const mockFoodResponse: FoodResponse = {
      success: true,
      data: {} as FoodModel, // Replace with the correct type or mock object
      message: 'success',
    };

    service.getFood('123').subscribe((response) => {
      expect(response).toEqual(mockFoodResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/foods/123`);
    expect(req.request.method).toBe('GET');
    req.flush(mockFoodResponse);
  });
});
