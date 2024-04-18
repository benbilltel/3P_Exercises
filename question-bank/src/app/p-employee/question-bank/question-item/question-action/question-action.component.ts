import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActionService } from './action-service/action-service.service';
import { Subscription } from 'rxjs';
import { DTOQuestion } from '../../../../dtos/dTOQuestion';
import { QuestionService } from '../../service/question.service';

@Component({
  selector: 'app-question-action',
  templateUrl: './question-action.component.html',
  styleUrl: './question-action.component.scss',
})
export class QuestionActionComponent implements OnInit, OnChanges {
  actions: string[] = [];
  isAction: boolean = false;
  private actionSubscription!: Subscription;
  @Input() question?: DTOQuestion;
  @Output() questionSend = new EventEmitter<DTOQuestion>();
  constructor(
    private actionService: ActionService,
    private questionService: QuestionService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.question) {
      if (this.question.questionStatus == 'Đang soạn thảo') {
        this.actions = ['Chỉnh sửa', 'Gửi duyệt', 'Xóa'];
      }
      if (this.question.questionStatus == 'Gửi duyệt') {
        this.actions = ['Chỉnh sửa', 'Phê duyệt', 'Trả về'];
      }
      if (this.question.questionStatus == 'Duyệt áp dụng') {
        this.actions = ['Xem chi tiết', 'Ngưng hiển thị'];
      }
      if (this.question.questionStatus == 'Ngưng áp dụng') {
        this.actions = ['Xem chi tiết', 'Phê duyệt', 'Trả về'];
      }
      if (this.question.questionStatus == 'Trả về') {
        this.actions = ['Chỉnh sửa', 'Gửi duyệt'];
      }
    }
  }
  questionToEdit() {
    this.questionSend.emit(this.question);
  }
  ngOnInit(): void {
    this.actionService.setIsAction(false);
    this.actionSubscription = this.actionService.isAction$.subscribe((data) => {
      this.isAction = data;
    });
  }
  toggle() {
    if (!this.isAction) {
      this.actionService.setIsAction(false);
      this.actionSubscription.unsubscribe();
      this.isAction = true;
      this.actionSubscription = this.actionService.isAction$.subscribe(
        (data) => {
          this.isAction = data;
        }
      );
    } else {
      this.actionService.setIsAction(false);
    }
  }
  updateQuestion(status: string) {
    let questionTemp = this.question;
    if (questionTemp) {
      questionTemp.questionStatus = status;
      
      this.questionService.updateQuestion(questionTemp);
    }
  }
  ngOnDestroy() {
    this.actionSubscription.unsubscribe();
  }
}
