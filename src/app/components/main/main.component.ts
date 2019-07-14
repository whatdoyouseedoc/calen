import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { DateService } from '../../date.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  public year: string;
  public month: string;
  public monthWord: string;
  public prev: string;
  public next: string;

  public params$;
  public daysList: string[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private dateSrv: DateService,
    private location: Location
  ) {
    this.params$ = this.activatedRoute.params.subscribe(({month, year}) => {
      if (month === undefined || year === undefined) {
        year = moment().format('YYYY');
        month = moment().format('M');
        this.location.go(`/year/${year}/month/${month}`);
      }

      this.setCurrentDate(month, year);
      this.daysList = this.dateSrv.getExtendedMonth(month, year);
    });
  }

  ngOnInit() {
  }

  prevMonth() {
    const {month, year} = this.dateSrv.getPrevMonthYear(this.month, this.year);
    return `/year/${year}/month/${month}`;
  }

  nextMonth() {
    const {month, year} = this.dateSrv.getNextMonthYear(this.month, this.year);
    return `/year/${year}/month/${month}`;
  }

  setCurrentDate(month, year) {
    this.year = year;
    this.month = month;
    this.monthWord = moment(this.month, 'M').format('MMMM');
    this.prev = this.prevMonth();
    this.next = this.nextMonth();
  }

  ngOnDestroy() {
    this.params$.unsubscribe();
  }
}
