import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public year: string;
  public month: string;
  public monthWord: string;
  public prev: string;
  public next: string;

  public params$;
  public daysList: string[];

  constructor(private activatedRoute: ActivatedRoute) {
    this.params$ = this.activatedRoute.params.subscribe(({year, month}) => {
      this.setCurrentDate(year, month);
      this.daysList = this.getDaysArray();
    });
  }

  ngOnInit() {
  }

  prevMonth() {
    const [month, year] = moment(`${this.month} ${this.year}`, 'M YYYY').subtract(1, 'months').format('M YYYY').split(' ');
    return `/year/${year}/month/${month}`;
  }

  nextMonth() {
    const [month, year] = moment(`${this.month} ${this.year}`, 'M YYYY').add(1, 'months').format('M YYYY').split(' ');
    return `/year/${year}/month/${month}`;
  }

  setCurrentDate(year, month) {
    this.year = year || moment().format('YYYY');
    this.month = month || moment().format('M');
    this.monthWord = moment(this.month, 'M').format('MMMM');
    this.prev = this.prevMonth();
    this.next = this.nextMonth();
  }

  getDaysArray() {
    const date = moment(`1 ${this.month} ${this.year}`, 'D M YYYY');
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
