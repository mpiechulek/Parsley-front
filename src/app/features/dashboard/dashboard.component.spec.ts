// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { DashboardComponent } from './dashboard.component';
// import { of } from 'rxjs';
// import { ApiService } from '@services/api.service';
// import { FoodModel, FoodResponse } from '@models/food.model';

// describe('DashboardComponent', () => {
//   let component: DashboardComponent;
//   let fixture: ComponentFixture<DashboardComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [DashboardComponent],
//     }).compileComponents();

//     fixture = TestBed.createComponent(DashboardComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

// describe('DashboardComponent', () => {
//   let component: DashboardComponent;
//   let fixture: ComponentFixture<DashboardComponent>;
//   let apiServiceSpy: jasmine.SpyObj<ApiService>;

//   beforeEach(async () => {
//     apiServiceSpy = jasmine.createSpyObj('ApiService', ['getFood']);

//     await TestBed.configureTestingModule({
//       imports: [DashboardComponent],
//       providers: [{ provide: ApiService, useValue: apiServiceSpy }],
//     }).compileComponents();

//     fixture = TestBed.createComponent(DashboardComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should call getFood on ngOnInit and set food signal', () => {
//     const mockFoodResponse: FoodResponse = {
//       success: true,
//       data: { id: '1', name: 'Pizza' } as FoodModel, // Mock food data
//       message: 'success',
//     };

//     apiServiceSpy.getFood.and.returnValue(of(mockFoodResponse));

//     component.ngOnInit();

//     expect(apiServiceSpy.getFood).toHaveBeenCalledWith('1');
//     expect(component.food()).toEqual(mockFoodResponse.data);
//   });
// });
