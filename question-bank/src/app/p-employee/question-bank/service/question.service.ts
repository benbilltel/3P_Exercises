import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { DTOQuestion } from '../../../dtos/dTOQuestion';
import { HttpClient } from '@angular/common/http';
import { DTOApi } from '../../../dtos/dTOApi';
const apiQuestion = "http://localhost:8080/questions"
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questions = new BehaviorSubject<DTOQuestion[]>([])
  questions$: Observable<DTOQuestion[]> = this.questions.asObservable()
  private page = new BehaviorSubject<number>(1)
  page$: Observable<number> = this.page.asObservable()
  private items = new BehaviorSubject<number>(5)
  items$: Observable<number> = this.items.asObservable()
  private totalPages = new BehaviorSubject<number>(1)
  totalPages$: Observable<number> = this.totalPages.asObservable()
  private searchText = new BehaviorSubject<string>("")
  searchText$: Observable<string> = this.searchText.asObservable()
  private status = new BehaviorSubject<string[]>([])
  status$: Observable<string[]> = this.status.asObservable()
  constructor(private http: HttpClient) { }
  getQuestions() {
    this.http.get<DTOApi>(apiQuestion + `/?page=${this.page.getValue()}&items=${this.items.getValue()}&searchText=${this.searchText.getValue()}&status=${this.status.getValue()}`).pipe(map(api => api.data)).subscribe(data => {
      this.questions.next(data.questions)
      this.page.next(data.page)
      this.items.next(data.items)
      this.totalPages.next(data.totalPages)
      console.log(data)
    })
  }
}
