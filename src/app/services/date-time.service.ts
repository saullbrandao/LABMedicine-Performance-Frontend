import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  constructor(private datePipe: DatePipe) {}

  getFormattedDate(date?: string | Date) {
    date = date || new Date();
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  getFormattedTime(time?: string | Date) {
    time = time || new Date();
    return this.datePipe.transform(time, 'HH:mm');
  }

  convertDateStringToISOFormat(date: String) {
    return date.split('/').reverse().join('-');
  }
}
