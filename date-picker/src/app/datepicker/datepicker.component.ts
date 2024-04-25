import {
  AfterContentChecked,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
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
  localeString: string = 'vi';
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
  monthToString = '';
  daySelected = '';
  monthSelected = '';
  yearSelected = '';
  dateToBind: any;
  public isShow = false;
  constructor(private elementRef: ElementRef) {
    moment.updateLocale(this.localeString, {});
  }
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
    this.dateToBind = `${this.yearSelected}-${this.monthSelected}-${this.daySelected}`;
    this.makeGrid();
  }
  public setSelectdedDate(obj: any) {
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
    this.crrDate = moment();

    this.navDate = moment();

    // this.makeHeader();

    this.makeGrid();
    document.addEventListener('click', (event) => {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.onClose(event);
      }
    });
  }

  onFocus(e: any) {
    this.isShow = false;
  }
  onToggle() {
    if (
      !moment(
        `${this.yearSelected}-${Number(this.monthSelected) - 1}-${Number(
          this.daySelected
        )}`
      ).isBefore(
        `${this.crrDate.year()}-${this.crrDate.month()}-${this.crrDate.date()}`
      )
    ) {
      if (this.selectedDate) {
        this.navDate = moment({
          year: Number(this.yearSelected),
          month: Number(this.monthSelected) - 1,
        });
        this.setSelectdedDate(this.selectedDate);
      }
    }

    this.isShow = !this.isShow;
  }
  onOpen() {
    if (this.selectedDate) {
      this.navDate = moment({
        year: Number(this.yearSelected),
        month: Number(this.monthSelected) - 1,
      });
      this.setSelectdedDate(this.selectedDate);
    }
    this.isShow = true;
  }
  @HostListener('document:click', ['$event'])
  onClose(event: any) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isShow = false; // Assuming 'isShow' controls date picker visibility
    }
  }
  convertMonth() {
    const monthIndex = Number(this.navDate.month());
    switch (monthIndex) {
      case 1:
        this.monthToString = 'hai';
        break;
      case 2:
        this.monthToString = 'ba';
        break;
      case 3:
        this.monthToString = 'tư';
        break;
      case 4:
        this.monthToString = 'năm';
        break;
      case 5:
        this.monthToString = 'sáu';
        break;
      case 6:
        this.monthToString = 'bảy';
        break;
      case 7:
        this.monthToString = 'tám';
        break;
      case 8:
        this.monthToString = 'chín';
        break;
      case 9:
        this.monthToString = 'mười';
        break;
      case 10:
        this.monthToString = 'mười một';
        break;
      case 11:
        this.monthToString = 'mười hai';
        break;
      case 0:
        this.monthToString = 'một';
        break;
    }
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
  changeNavMonth(num: number) {
    if (this.canChangeNavMonth(num)) {
      this.navDate.add(num, 'month');
      this.makeGrid();
    }
  }

  canChangeNavMonth(num: number) {
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
    this.convertMonth();
  }

  isAvailable(num: number): boolean {
    let dateToCheck = this.dateFromNum(num, this.navDate);
    if (dateToCheck.isBefore(moment(), 'day')) {
      return false;
    } else {
      return true;
    }
  }
  blurDateInput(event: any) {
    let e = event.target.value;
    e = e.split('-');
    let year = Number(e[0]);
    let month = Number(e[1]);
    let day = Number(e[2]);
    if (year && month && day) {
      if (
        !moment(`${year}-${month}-${day}`).isBefore(
          `${this.crrDate.year()}-${this.crrDate.month()+1}-${this.crrDate.date()}`
        )
      ) {
        
        this.navDate = moment({
          year: year,
          month: month-1,
          date: day,
        });

        this.onTouch(this.navDate);
      } else {
        this.setSelectdedDate(this.crrDate);
      }
    } else {
      this.setSelectdedDate(this.crrDate);
    }
  }

  dateFromNum(num: number, referenceDate: any): any {
    let returnDate = moment(referenceDate);
    return returnDate.date(num);
  }
  selectDay(day: any) {
    if (day.available) {
      this.setSelectdedDate(this.dateFromNum(day.value, this.navDate));
    }
  }
  checkCrrDate(day: any) {
    if (
      day.value == this.crrDate.date() &&
      !moment(
        `${this.crrDate.year()}-${this.crrDate.month()+1}-${this.crrDate.date()}`
      ).isBefore(`${this.navDate.year()}-${this.navDate.month()+1}-${day.value}`)
    ) {
      return true;
    }
    return false;
  }
}
