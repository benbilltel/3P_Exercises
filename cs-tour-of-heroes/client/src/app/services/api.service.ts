import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { DTOApi } from '../DTOs/dtoapi';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
  handleObservableApi(obser: Observable<DTOApi>, handleFail: Function): Observable<any> {
    return obser.pipe(
      map(api => {
        if (api.status !== "OK") {
          handleFail(api.message);
        } else {
          return api.data
        }
      }),
      catchError(error => {
        console.error('Error fetching heroes:', error);
        return of([]);
      }))
  }
}
