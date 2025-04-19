import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderPickerComponent } from './gender-picker.component';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('GenderPickerComponent', () => {
  let component: GenderPickerComponent;
  let fixture: ComponentFixture<GenderPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenderPickerComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(GenderPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
