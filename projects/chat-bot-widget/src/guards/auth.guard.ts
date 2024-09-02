import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Verifica si estás en un entorno de navegador antes de acceder a localStorage
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    // Si no estás en un navegador, deniega el acceso
    router.navigate(['/login']);
    return of(false);
  }

  const email = localStorage.getItem('userEmail');

  if (!email || !validateEmail(email)) {
    // Si no hay un correo válido, redirige al login
    router.navigate(['/login']);
    return of(false);
  }

  return authService.login(email).pipe(
    map(response => {
      if (response && (response.message === 'User already exists' || response.message === 'User created')) {
        localStorage.setItem('userEmail', email);
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};

// Función para validar el formato del correo electrónico
function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
