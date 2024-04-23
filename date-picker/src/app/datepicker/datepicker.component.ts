import {
  AfterContentChecked,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import moment from 'moment';
@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
  ],
})
export class DatepickerComponent implements OnInit, ControlValueAccessor {
  selectedDateFormatted: any;
  localeString: string = 'en';
  navDate: any;
  // weekDaysHeaderArr: Array<string> = [];
  gridArr: Array<any> = [];
  selectedDate: any;
  crrDate: any;
  val: any;
  onChange: any = (val: any) => {};
  onTouch: any = () => {};
  constructor() {}
  writeValue(obj: any): void {
    this.selectedDateFormatted = obj;
  }
  setSelectedDate(obj: any) {
    if (
      this.selectedDateFormatted == undefined ||
      this.selectedDateFormatted !== obj
    ) {
      this.selectedDateFormatted = obj;
      this.dateOnChange(obj);
    }
  }
  dateOnChange(obj: any) {
    console.log(obj);
    this.onChange(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    moment.locale(this.localeString);
    this.crrDate = moment();
    if (!this.selectedDateFormatted) {
      this.navDate = moment();

      // this.makeHeader();
    } else {
      this.navDate = moment();
    }
    this.makeGrid();
  }
  changeViewMonth(num: number) {
    this.navDate.add(num, 'month');
    this.makeGrid();
  }
  // makeHeader(){
  //   const weekDaysArr: Array<number> = [0, 1, 2, 3, 4, 5, 6];
  //   weekDaysArr.forEach(day => this.weekDaysHeaderArr.push(moment().weekday(day).format('ddd')));
  // }
  makeGrid() {
    this.gridArr = [];
    this.selectedDate = null;
    const firstDayDate = moment(this.navDate).startOf('month');
    const initialEmptyCells = firstDayDate.weekday();
    const lastDayDate = moment(this.navDate).endOf('month');
    const lastEmptyCells = 6 - lastDayDate.weekday();
    const daysInMonth = this.navDate.daysInMonth();
    const arrayLength = initialEmptyCells + lastEmptyCells + daysInMonth;

    for (let i = 0; i < arrayLength; i++) {
      let obj: any = {};
      if (i < initialEmptyCells || i > initialEmptyCells + daysInMonth - 1) {
        obj.value = 0;
        obj.available = false;
      } else {
        obj.value = i - initialEmptyCells + 1;
        obj.available = this.isAvailable(i - initialEmptyCells + 1);
      }
      this.gridArr.push(obj);
    }
  }

  isAvailable(num: number): boolean {
    let dateToCheck = this.dateFromNum(num, this.navDate);
    if (dateToCheck.isBefore(moment(), 'day')) {
      return false;
    } else {
      return true;
    }
  }

  dateFromNum(num: number, referenceDate: any): any {
    let returnDate = moment(referenceDate);
    return returnDate.date(num);
  }
  selectDay(day: any) {
    if (day.available) {
      this.selectedDate = this.dateFromNum(day.value, this.navDate);
      const year = this.selectedDate.year();
      const month =
        this.selectedDate.month() + 1 < 10
          ? '0' + (this.selectedDate.month() + 1)
          : this.selectedDate.month() + 1;
      const daySelect =
        this.selectedDate.date() < 10
          ? '0' + this.selectedDate.date()
          : this.selectedDate.date();

      this.setSelectedDate(`${daySelect}-${month}-${year}`);
    }
  }
  checkCrrDate(day: any) {
    if (
      day.value == this.crrDate.date() &&
      this.navDate.month() == moment().month()
    ) {
      return true;
    }
    return false;
  }
}
