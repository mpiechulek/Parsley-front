import { TestBed } from '@angular/core/testing';
import { CanMatchFn, Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  const executeGuard: CanMatchFn = (route, segments) =>
    TestBed.runInInjectionContext(() => authGuard(route, segments));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should return true if the user is valid', () => {
    // Mock AuthService to simulate a valid user
    TestBed.overrideProvider(AuthService, {
      useValue: { getBearerToken: 'valid-token' },
    });

    const result = executeGuard({} as Route, []); // Provide required arguments
    expect(result).toBe(true); // Assuming the user is valid in this test case
  });

  it('should navigate to /login if the user is invalid', () => {
    // Mock the AuthService and Router to simulate invalid user
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.overrideProvider(Router, { useValue: routerSpy });
    TestBed.overrideProvider(AuthService, {
      useValue: { getBearerToken: null },
    });

    const result = executeGuard({} as Route, []); // Provide required arguments
    expect(result).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
