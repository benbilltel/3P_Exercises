import { Component } from '@angular/core';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrl: './question-bank.component.scss'
})
export class QuestionBankComponent {
  isDraft: boolean = true
  isSending: boolean = false
  isApprove: boolean = false
  isInactive: boolean = false
  filter(filter: number) {
    switch (filter) {
      case 0:
        this.isDraft = !this.isDraft
        break;
      case 1:
        this.isSending = !this.isSending
        break;
      case 2:
        this.isApprove = !this.isApprove
        break;
      case 3:
        this.isInactive = !this.isInactive
        break;
      default:
        break;
    }
  }
}
