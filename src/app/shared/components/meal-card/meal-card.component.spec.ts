import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealCardComponent } from './meal-card.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('MealCardComponent', () => {
  let component: MealCardComponent;
  let fixture: ComponentFixture<MealCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealCardComponent],
      providers: [provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(MealCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
