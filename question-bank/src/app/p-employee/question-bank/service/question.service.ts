import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { DTOQuestion } from '../../../dtos/dTOQuestion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DTOApi } from '../../../dtos/dTOApi';
const apiQuestion = 'http://localhost:8080/questions';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private questions = new BehaviorSubject<DTOQuestion[]>([]);
  questions$: Observable<DTOQuestion[]> = this.questions.asObservable();
  private page = new BehaviorSubject<number>(1);
  page$: Observable<number> = this.page.asObservable();
  private items = new BehaviorSubject<number>(15);
  items$: Observable<number> = this.items.asObservable();
  private totalPages = new BehaviorSubject<number>(1);
  totalPages$: Observable<number> = this.totalPages.asObservable();
  private searchText = new BehaviorSubject<string>('');
  searchText$: Observable<string> = this.searchText.asObservable();
  private status = new BehaviorSubject<string[]>([]);
  status$: Observable<string[]> = this.status.asObservable();
  private questionsToAction = new BehaviorSubject<DTOQuestion[]>([]);
  questionsToAction$: Observable<DTOQuestion[]> = this.questionsToAction.asObservable();
  private actions = new BehaviorSubject<string[]>([]);
  actions$: Observable<string[]> = this.actions.asObservable();
  constructor(private http: HttpClient) {}
  getQuestions() {
    this.http
      .get<DTOApi>(
        apiQuestion +
          `/?page=${this.page.getValue()}&items=${this.items.getValue()}&searchText=${this.searchText.getValue()}&status=${JSON.stringify(
            this.status.getValue()
          )}`
      )
      .pipe(map((api) => api.data))
      .subscribe((data) => {
        this.questions.next(data.questions);
        this.page.next(data.page);
        this.items.next(data.items);
        this.totalPages.next(data.totalPages);
      });
  }
  setQuestionsToAction(questions: DTOQuestion[]){
    this.questionsToAction.next(questions)
  }
  search(status: string[], searchText: string = '') {
    this.status.next(status);
    this.searchText.next(searchText);
    this.getQuestions();
  }
  updateQuestion(questionUpdate: DTOQuestion) {
    this.http.put<DTOApi>(apiQuestion, {"questionUpdate":questionUpdate}).subscribe((data)=>{
      this.getQuestions()
    });
  }
  
}
