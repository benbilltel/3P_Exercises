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
  localeString: string = 'en';
  navDate: any;
  // weekDaysHeaderArr: Array<string> = [];
  gridArr: Array<any> = [];
  selectedDate: any;
  crrDate: any;
  onChange: any = (val: any) => {
    this.writeValue(val);
  };
  onTouch: any = (val: any) => {
    this.writeValue(val);
  };
  daySelected = '';
  monthSelected = '';
  yearSelected = '';
  constructor() {}
  writeValue(obj: any): void {
    this.selectedDate = obj;
    this.yearSelected = this.selectedDate?.year();
    this.monthSelected =
      this.selectedDate.month() + 1 < 10
        ? '0' + (this.selectedDate.month() + 1)
        : this.selectedDate.month() + 1;
    this.daySelected =
      this.selectedDate.date() < 10
        ? '0' + this.selectedDate.date()
        : this.selectedDate.date();
    this.makeGrid();
  }
  setSelectedDate(obj: any) {
    this.writeValue(obj);
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
    if (!this.selectedDate) {
      this.navDate = moment();

      // this.makeHeader();
    } else {
      this.navDate = this.selectedDate;
    }
    this.makeGrid();
  }
  checkSelected(day: any) {
    if (
      this.navDate?.year() == Number(this.yearSelected) &&
      this.navDate?.month() == Number(this.monthSelected) - 1 &&
      Number(day) != 0
    ) {
      if (Number(day) == Number(this.daySelected)) {
        if (
          moment(
            `${this.crrDate.year()}-${this.crrDate.month() + 1}-${
              this.crrDate.date() - 1
            }`
          ).isBefore(
            `${this.yearSelected}-${this.monthSelected}-${this.daySelected}`
          )
        ) {
          return true;
        }
      }
    }
    return false;
  }
  changeNavMonth(num: number){
    if(this.canChangeNavMonth(num)){
      this.navDate.add(num, 'month');
      this.makeGrid();
    }
  }

  canChangeNavMonth(num: number){
    const clonedDate = moment(this.navDate);
    clonedDate.add(num, 'month');
    const minDate = moment().add(-1, 'month');
    //const maxDate = moment().add(1, 'year');

    //return clonedDate.isBetween(minDate, maxDate);
    return clonedDate.isAfter(minDate);
  }
  // makeHeader(){
  //   const weekDaysArr: Array<number> = [0, 1, 2, 3, 4, 5, 6];
  //   weekDaysArr.forEach(day => this.weekDaysHeaderArr.push(moment().weekday(day).format('ddd')));
  // }
  makeGrid() {
    this.gridArr = [];
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
  changeDayInput(e: any) {
    e = Number(e);
    if (
      moment(
        `${this.crrDate.year()}-${this.crrDate.month() + 1}-${
          this.crrDate.date() - 1
        }`
      ).isBefore(
        `${this.yearSelected}-${this.monthSelected}-${this.daySelected}`
      ) &&
      e > 0
    ) {
      this.navDate = moment({
        year: this.navDate.year(),
        month: this.navDate.month(),
        date: e,
      });
      this.onChange(this.navDate);
    } else {
    }
  }
  changeMonthInput(e: any) {
    e = Number(e);
    if (e >= this.crrDate.month() + 1 && e > 0) {
      this.navDate = moment({
        year: this.navDate.year(),
        month: e - 1,
        date: this.navDate.date(),
      });
      this.onChange(this.navDate);
    } else {
    }
  }
  changeYearInput(e: any) {
    e = Number(e);
    if (e >= this.crrDate.year() && e > 0) {
      this.navDate = moment({
        year: e,
        month: this.navDate.month(),
        date: this.navDate.date(),
      });
      this.onChange(this.navDate);
    } else {
    }
  }
  blurDayInput(event: any) {
    let e = Number(event.target.value);
    if (
      moment(
        `${this.crrDate.year()}-${
          this.crrDate.month() + 1
        }-${this.crrDate.date()}`
      ).isBefore(
        `${this.yearSelected}-${this.monthSelected}-${this.daySelected}`
      ) &&
      e > 0
    ) {
      this.navDate = moment({
        year: this.navDate.year(),
        month: this.navDate.month(),
        date: e,
      });
      this.onTouch(this.navDate);
    } else {
      this.daySelected =
        this.navDate.date() < 10
          ? '0' + this.navDate.date()
          : this.navDate.date();
    }
  }
  blurMonthInput(event: any) {
    let e = Number(event.target.value);
    if (e >= this.crrDate.month() + 1 && e > 0) {
      this.navDate = moment({
        year: this.navDate.year(),
        month: e - 1,
        date: this.navDate.date(),
      });
      this.onTouch(this.navDate);
    } else {
      this.monthSelected =
        this.navDate.month() + 1 < 10
          ? '0' + (this.navDate.month() + 1)
          : this.navDate.month() + 1;
    }
  }
  blurYearInput(event: any) {
    let e = Number(event.target.value);
    if (e >= this.crrDate.year() && e > 0) {
      this.navDate = moment({
        year: e,
        month: this.navDate.month(),
        date: this.navDate.date(),
      });
      this.onTouch(this.navDate);
    } else {
      this.yearSelected = this.crrDate.year();
    }
  }
  dateFromNum(num: number, referenceDate: any): any {
    let returnDate = moment(referenceDate);
    return returnDate.date(num);
  }
  selectDay(day: any) {
    if (day.available) {
      this.setSelectedDate(this.dateFromNum(day.value, this.navDate));
    }
  }
  checkCrrDate(day: any) {
    if (
      day.value == this.crrDate.date() &&
      !moment(
        `${this.crrDate.year()}-${this.crrDate.month()}-${this.crrDate.date()}`
      ).isBefore(`${this.navDate.year()}-${this.navDate.month()}-${day.value}`)
    ) {
      return true;
    }
    return false;
  }
}
