import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteButtonsComponent } from './delete-buttons.component';

describe('DeleteButtonsComponent', () => {
  let component: DeleteButtonsComponent;
  let fixture: ComponentFixture<DeleteButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteButtonsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
