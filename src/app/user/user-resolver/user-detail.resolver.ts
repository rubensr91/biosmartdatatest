// user-detail.resolver.ts
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataService } from '../../core/services/data/data.service';

export const userDetailResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<any> => {
  const dataService = inject(DataService);
  const id = route.paramMap.get('id');

  if (!id) {
    console.error('ID de usuario no proporcionado.');
    return EMPTY;
  }

  return dataService.getUser(Number(id)).pipe(
    catchError((error) => {
      console.error('Error al cargar el usuario:', error);
      return of(null);
    })
  );
};
