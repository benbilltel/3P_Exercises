import { Injectable } from '@angular/core';
import { DTOModule } from '../dtos/dTOModule';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DTOApi } from '../dtos/dTOApi';
const apiModule = "http://localhost:8080/modules"
@Injectable({
  providedIn: 'root'
})
export class ModulesService {
  private modulesSubject = new BehaviorSubject<DTOModule[]>([]);
  modules$: Observable<DTOModule[]> = this.modulesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getModules()
  }
  getModules() {
    this.http.get<DTOApi>(apiModule).pipe(
      map(api => api.data as DTOModule[])
    )
      .subscribe(data => {
        this.modulesSubject.next(data);
      });
  }

}
