import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DTOQuestion } from '../../../../dtos/dTOQuestion';

@Component({
  selector: 'app-question-actions',
  templateUrl: './question-actions.component.html',
  styleUrl: './question-actions.component.scss',
})
export class QuestionActionsComponent implements OnChanges {
  @Input() questionsToAction?: DTOQuestion[];
  @Input() actions!: string[];
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {}
  updateQuestions(action: string){
    console.log(action)
  }
}
