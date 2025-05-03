import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealBoardComponent } from './meal-board.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('MealBoardComponent', () => {
  let component: MealBoardComponent;
  let fixture: ComponentFixture<MealBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealBoardComponent],
      providers: [provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(MealBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
