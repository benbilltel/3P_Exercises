import {
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
@Directive({
  selector: '[dialogSucess]',
  standalone: true,
})
export class DialogSuccessDirective {
  constructor() {}
}
@Directive({
  selector: '[dialogInfo]',
  standalone: true,
})
export class DialogInfoDirective {
  constructor() {}
}
@Directive({
  selector: '[dialogDanger]',
  standalone: true,
})
export class DialogDangerDirective {
  constructor() {}
}
@Directive({
  selector: '[dialog-header]',
  standalone: true,
})
export class DialogHeaderDirective {
  constructor() {}
}
@Directive({
  selector: '[dialog-footer]',
  standalone: true,
})
export class DialogFooterDirective {
  constructor() {}
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
  @ContentChild(DialogSuccessDirective, { read: TemplateRef })
  dialogSucess!: TemplateRef<any>;
  @ContentChild(DialogDangerDirective, { read: TemplateRef })
  dialogDanger!: TemplateRef<any>;
  @ContentChild(DialogInfoDirective, { read: TemplateRef })
  dialogInfo!: TemplateRef<any>;
  ngOnInit() {}
}
