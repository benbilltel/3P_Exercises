import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DTOhero } from '../DTOs/dtohero';
import { DTOApi } from '../../DTOs/dtoapi';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
const apiHero = `http://localhost:8080/heroes`
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient, private apiService: ApiService) { }

  getAll(): Observable<DTOhero[]> {
    return this.apiService.handleObservableApi(this.http.get<DTOApi>(apiHero), () => { })
  }
  get(id: number) {
    return this.apiService.handleObservableApi(this.http.get<DTOApi>(apiHero + "/" + id), () => { })
  }
}

