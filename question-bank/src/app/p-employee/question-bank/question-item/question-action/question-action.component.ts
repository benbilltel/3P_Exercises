import { Component, OnInit } from '@angular/core';
import { ActionService } from './action-service/action-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question-action',
  templateUrl: './question-action.component.html',
  styleUrl: './question-action.component.scss'
})
export class QuestionActionComponent implements OnInit {
  actions: string[] = ["Them", "xoas", "sau"]
  isAction: boolean = false
  private actionSubscription!: Subscription;
  constructor(private actionService: ActionService) {

  }
  ngOnInit(): void {
    this.actionService.setIsAction(false)
    this.actionSubscription = this.actionService.isAction$.subscribe(data => {
      this.isAction = data;
    });
  }
  toggle() {
    if (!this.isAction) {
      this.actionService.setIsAction(false)
      this.actionSubscription.unsubscribe();
      this.isAction = true
      this.actionSubscription = this.actionService.isAction$.subscribe(data => {
        this.isAction = data;
      });
    } else {
      this.actionService.setIsAction(false)
    }
  }
  ngOnDestroy() {
    this.actionSubscription.unsubscribe();
  }
}
