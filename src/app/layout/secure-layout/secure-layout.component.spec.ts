import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecureLayoutComponent } from './secure-layout.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from '@services/auth.service';
import { GlobalStore } from 'app/state/global.state';

describe('SecureLayoutComponent', () => {
  let component: SecureLayoutComponent;
  let fixture: ComponentFixture<SecureLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        GlobalStore,
        AuthService,
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SecureLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
