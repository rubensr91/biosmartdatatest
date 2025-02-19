import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/users`)
      .pipe(catchError(this.handleError));
  }

  getUser(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/users/${id}`)
      .pipe(catchError(this.handleError));
  }

  //Get users data for PieChart
  getUsersData(): Observable<any> {
    return this.getUsers().pipe(
      map((users) => {
        const companyNames = users.map((user) => user.company.name);
        const counts: { [companyName: string]: number } = {};
        companyNames.forEach((name) => {
          counts[name] = (counts[name] || 0) + 1;
        });

        const labels = Object.keys(counts);
        const data = Object.values(counts);

        return {
          labels: labels,
          datasets: [{ data: data }],
        };
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage =
      'Algo salió mal; por favor, inténtelo de nuevo más tarde.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}, Mensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
