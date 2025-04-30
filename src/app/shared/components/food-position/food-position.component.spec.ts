import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodPositionComponent } from './food-position.component';

describe('FoodPositionComponent', () => {
  let component: FoodPositionComponent;
  let fixture: ComponentFixture<FoodPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodPositionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoodPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
