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
    console.error('ID not found.');
    return EMPTY;
  }

  return dataService.getUser(Number(id)).pipe(
    catchError((error) => {
      console.error('Error loading user:', error);
      return of(null);
    })
  );
};
