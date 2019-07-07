import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getPrevMonthYear(month: string, year: string) {
    const [prevMonth, prevYear] = moment(`${month} ${year}`, 'M YYYY')
      .subtract(1, 'months')
      .format('M YYYY')
      .split(' ');

    return {month: prevMonth, year: prevYear};
  }

  getNextMonthYear(month: string, year: string) {
    const [nextMonth, nextYear] = moment(`${month} ${year}`, 'M YYYY')
      .add(1, 'months')
      .format('M YYYY')
      .split(' ');

    return {month: nextMonth, year: nextYear};
  }

  /* Build array of all month dates plus extend it for closest starting monday and finishing sunday */
  getExtendedMonth(month: string, year: string) {
    const date = moment(`1 ${month} ${year}`, 'D M YYYY');
    const daysInMonth = date.daysInMonth();
    const days = [];

    let cur = date;
    for (let i = 1; i <= daysInMonth; i++ ) {
      days.push(cur.toString());
      cur = moment(cur).add(1, 'days');
    }

    cur = date;
    while (cur.format('dddd') !== 'Monday') {
      cur = moment(cur).subtract(1, 'days');
      days.unshift(cur.toString());
    }

    cur = moment(days[days.length - 1]);
    while (cur.format('dddd') !== 'Sunday') {
      cur = moment(cur).add(1, 'days');
      days.push(cur.toString());
    }

    return days;
  }
}
