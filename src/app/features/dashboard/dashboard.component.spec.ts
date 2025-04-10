// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { DashboardComponent } from './dashboard.component';
// import { ApiService } from '@services/api.service';
// import { GlobalStore } from 'app/state/global.state';
// import { FoodModel, FoodResponse } from '@models/food.model';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import {
//   HttpTestingController,
//   provideHttpClientTesting,
// } from '@angular/common/http/testing';
// import { provideHttpClient } from '@angular/common/http';

// describe('DashboardComponent', () => {
//   let component: DashboardComponent;
//   let fixture: ComponentFixture<DashboardComponent>;
//   let httpMock: HttpTestingController;
//   // let apiService: ApiService;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [DashboardComponent],
//       providers: [
//         ApiService,
//         GlobalStore,
//         provideAnimations(),
//         provideHttpClient(),
//         provideHttpClientTesting(), // Use the new HttpClient testing provider
//       ],
//     }).compileComponents();

//     // apiService = TestBed.inject(ApiService);
//     fixture = TestBed.createComponent(DashboardComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     httpMock.verify(); // Ensure no outstanding HTTP requests
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();

//     const mockFoodResponse: FoodResponse = {
//       success: true,
//       data: { id: '1', name: 'Pizza' } as FoodModel,
//       message: 'success',
//     };

//     const req = httpMock.expectOne('http://localhost:3000/api/v1/foods/short-list');
//     expect(req.request.method).toBe('GET');
//     req.flush(mockFoodResponse); // Respond with mock data
//     expect(component.foodData()).toEqual(mockFoodResponse.data);
//   });
// });
