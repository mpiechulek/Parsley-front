import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrientsDisplayComponent } from './nutrients-display.component';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('NutrientsDisplayComponent', () => {
  let component: NutrientsDisplayComponent;
  let fixture: ComponentFixture<NutrientsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutrientsDisplayComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(NutrientsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
