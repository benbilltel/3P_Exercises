import { Component } from '@angular/core';
import { DTOQuestion } from '../../dtos/dTOQuestion';
import { QuestionService } from './service/question.service';

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
  questionEdit?: DTOQuestion
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
  constructor(private questionService: QuestionService){
    this.questionService.getQuestions()
  }
  openDrawer(code: number) {
    if (code == -1) {
      let dummyQuestion = new DTOQuestion
      dummyQuestion.questionCode = ""
      dummyQuestion.questionName = ""
      dummyQuestion.questionGroup = ""
      dummyQuestion.questionType = ""
      dummyQuestion.questionTime = 30
      dummyQuestion.questionStatus = "Đang soạn thảo"
      dummyQuestion.questionCalculating = ""
      this.questionEdit = dummyQuestion
    }

  }
}
