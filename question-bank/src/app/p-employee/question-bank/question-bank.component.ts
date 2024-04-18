import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { DTOQuestion } from '../../dtos/dTOQuestion';
import { QuestionService } from './service/question.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrl: './question-bank.component.scss',
})
export class QuestionBankComponent implements OnInit, OnDestroy {
  isDraft: boolean = true;
  isSending: boolean = false;
  isApprove: boolean = false;
  isInactive: boolean = false;
  questionEdit?: DTOQuestion;
  questions?: DTOQuestion[];
  status: string[] = [];
  searchText: string = '';
  questionsToAction: DTOQuestion[] = [];
  private subscriptions: Subscription[] = [];
  filter(filter: number) {
    this.status = [];
    switch (filter) {
      case 0:
        this.isDraft = !this.isDraft;
        break;
      case 1:
        this.isSending = !this.isSending;
        break;
      case 2:
        this.isApprove = !this.isApprove;
        break;
      case 3:
        this.isInactive = !this.isInactive;
        break;
      default:
        break;
    }
    if (this.isDraft) {
      this.status.push('Đang soạn thảo', 'Trả về');
    }
    if (this.isSending) {
      this.status.push('Gửi duyệt');
    }
    if (this.isApprove) {
      this.status.push('Duyệt áp dụng');
    }
    if (this.isInactive) {
      this.status.push('Ngưng áp dụng');
    }
    this.search();
  }

  constructor(private questionService: QuestionService) {}
  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((sb) => sb.unsubscribe());
    }
  }
  asyncQuestionsToAction(questions: DTOQuestion[]) {
    this.questionService.setQuestionsToAction(questions);
  }
  ngOnInit(): void {
    this.questionService.getQuestions();
    this.subscriptions.push(
      this.questionService.questions$.subscribe((data) => {
        this.questions = data;
      })
    );
    this.subscriptions.push(
      this.questionService.questionsToAction$.subscribe((data) => {
        this.questionsToAction = data;
      })
    );
  }
  clearQuestionEdit(question: DTOQuestion) {
    this.questionEdit = question;
  }
  openDrawer() {
    let dummyQuestion = new DTOQuestion();
    dummyQuestion.code = '-1';
    dummyQuestion.questionCode = '';
    dummyQuestion.questionName = '';
    dummyQuestion.questionGroup = '';
    dummyQuestion.questionType = '';
    dummyQuestion.questionTime = 30;
    dummyQuestion.questionStatus = 'Đang soạn thảo';
    dummyQuestion.questionCalculating = '';
    this.questionEdit = dummyQuestion;
  }
  search() {
    this.questionService.search(this.status, this.searchText);
  }
  openDrawerToEdit(question: DTOQuestion) {
    if (question) {
      this.questionEdit = question;
    }
  }
}
