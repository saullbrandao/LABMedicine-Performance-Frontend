import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  constructor() {}

  getCurrentDate() {
    return `${new Date().getDate().toString().padStart(2, '0')}/${(
      new Date().getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${new Date().getFullYear()}`;
  }

  getCurrentTime() {
    return `${new Date().getHours().toString().padStart(2, '0')}:${new Date()
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  }
}
