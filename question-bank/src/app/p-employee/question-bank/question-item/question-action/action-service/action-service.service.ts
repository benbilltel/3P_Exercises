import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService{
  private isAction = new Subject<boolean>()
  isAction$: Observable<boolean> = this.isAction.asObservable();
  constructor() {
    this.setIsAction(false)
   }
  setIsAction(state:boolean){
    this.isAction.next(state)
  }
}
