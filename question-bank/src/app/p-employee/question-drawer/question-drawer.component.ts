import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { DTOQuestion } from '../../dtos/dTOQuestion';

@Component({
  selector: 'app-question-drawer',
  templateUrl: './question-drawer.component.html',
  styleUrl: './question-drawer.component.scss',
})
export class QuestionDrawerComponent
  implements OnInit, OnChanges, AfterViewChecked, AfterContentChecked
{
  @Input() questionEdit?: DTOQuestion;
  @Output() questionClear = new EventEmitter<DTOQuestion>();
  @ViewChild('drawerQuesion') drawerQuesion!: MatDrawer;
  @ViewChild('questionNameInput') questionNameInput!: ElementRef;
  questionForm?: FormGroup;
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.questionForm = new FormGroup({
      questionName: new FormControl(this.questionEdit?.questionName),
      questionCode: new FormControl(this.questionEdit?.questionCode),
      questionGroup: new FormControl(this.questionEdit?.questionGroup),
      questionType: new FormControl(this.questionEdit?.questionType),
      questionCalculating: new FormControl(
        this.questionEdit?.questionCalculating
      ),
      questionTime: new FormControl(this.questionEdit?.questionTime),
      questionStatus: new FormControl(this.questionEdit?.questionStatus),
    });
  }
  onSubmit() {}
  ngAfterContentChecked(): void {
    if (this.questionEdit) {
      this.csOpenDrawer();
    }
  }
  ngAfterViewChecked(): void {}

  csOpenDrawer() {
    this.drawerQuesion.open().then(() => {
      this.questionNameInput.nativeElement.focus();
    });
  }
  csCloseDrawer() {
    this.questionEdit = undefined;
    this.questionClear.emit(this.questionEdit);
    this.drawerQuesion.close();
  }
}
