import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DTOQuestion } from '../../../dtos/dTOQuestion';
import { QuestionService } from '../service/question.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrl: './question-item.component.scss',
})
export class QuestionItemComponent implements OnInit, OnChanges {
  @ViewChild('tbody') tbody!: ElementRef;
  @Input() questions?: DTOQuestion[];
  @Output() questionToSend = new EventEmitter<DTOQuestion>();
  @Input() questionsToAction!: DTOQuestion[];
  @Output() sendQuestionsToAction = new EventEmitter<DTOQuestion[]>();
  isAllActive = false
  isActions = false
  questionsActive?: DTOQuestion[];
  actions : string[] = []
  
  sendQuestion(question: DTOQuestion) {
    this.questionToSend.emit(question);
  }
  ngOnInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.checkedAllActive()
  }
  constructor(private questionService : QuestionService){

  }
  

  displayActions() {
    this.actions = []
    this.questionsToAction?.forEach((q) => {
      if (q.questionStatus == 'Đang soạn thảo') {
        if (!this.actions.includes('Gửi duyệt')) {
          this.actions.push('Gửi duyệt');
        }
        if (!this.actions.includes('Xóa')) {
          this.actions.push('Xóa');
        }
      }
      if (q.questionStatus == 'Gửi duyệt') {
        if (!this.actions.includes('Duyệt áp dụng')) {
          this.actions.push('Duyệt áp dụng');
        }
        if (!this.actions.includes('Trả về')) {
          this.actions.push('Trả về');
        }
      }
      if (q.questionStatus == 'Duyệt áp dụng') {
        if (!this.actions.includes('Ngưng áp dụng')) {
          this.actions.push('Ngưng áp dụng');
        }
      }
      if (q.questionStatus == 'Ngưng áp dụng') {
        if (!this.actions.includes('Duyệt áp dụng')) {
          this.actions.push('Duyệt áp dụng');
        }
        if (!this.actions.includes('Trả về')) {
          this.actions.push('Trả về');
        }
      }
      if (q.questionStatus == 'Trả về') {
        if (!this.actions.includes('Gửi duyệt')) {
          this.actions.push('Gửi duyệt');
        }
      }
    });
  }
  checkQuestion(question: DTOQuestion) {
    if (this.questionsToAction?.includes(question)) {
      let index = Number(
        this.questionsToAction.findIndex((q) => q.code == question.code)
      );
      this.questionsToAction.splice(index, 1);
    } else {
      this.questionsToAction?.push(question);
    }
    this.sendQuestionsToAction.emit(this.questionsToAction);
    this.displayActions()
    this.checkedAllActive()
  }
  checkedAllActive(){
    let count = 0;
    this.questions?.forEach((q) => {
      if (this.questionsToAction?.includes(q)) {
        count++;
      }
    });
    if (count == this.questions?.length && count != 0){
      this.isAllActive = true
    }else{
      this.isAllActive = false
    }
  }
  checkQuestions() {
    let count = 0;
    this.questions?.forEach((q) => {
      if (this.questionsToAction?.includes(q)) {
        count++;
      }
    });
    if (count != this.questions?.length) {
      this.questions?.forEach((q) => {
        if (this.questionsToAction?.includes(q)) {
          let index = Number(
            this.questionsToAction.findIndex((qc) => qc.code == q.code)
          );
          this.questionsToAction.splice(index, 1);
        }
        this.questionsToAction?.push(q);
      });
    }else{
      this.questions?.forEach((q) => {
        if (this.questionsToAction?.includes(q)) {
          let index = Number(
            this.questionsToAction.findIndex((qc) => qc.code == q.code)
          );
          this.questionsToAction.splice(index, 1);
        }
      });
      
    }
    this.sendQuestionsToAction.emit(this.questionsToAction);
    this.displayActions()
    this.checkedAllActive()
    
  }
}
