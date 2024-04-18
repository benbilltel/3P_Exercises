import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { DTOQuestion } from '../../../../dtos/dTOQuestion';
import { QuestionService } from '../../service/question.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question-actions',
  templateUrl: './question-actions.component.html',
  styleUrl: './question-actions.component.scss',
})
export class QuestionActionsComponent implements OnChanges {
  @Input() questionsToAction?: DTOQuestion[];
  @Input() actions!: string[];
  constructor(private questionService : QuestionService) {}
  
  ngOnChanges(changes: SimpleChanges): void {}
  updateQuestions(action: string){
    this.questionService.updateQuestions(action)
    this.questionService.clearQuestionsToActions()
  }
  clearQuestionsToAction(){
    this.questionService.clearQuestionsToActions()
  }
}
