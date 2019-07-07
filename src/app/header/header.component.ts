import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { DateService } from '../date.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public year: string;
  public month: string;
  public monthWord: string;
  public prev: string;
  public next: string;

  public params$;
  public daysList: string[];

  constructor(private activatedRoute: ActivatedRoute, private dateSrv: DateService) {
    this.params$ = this.activatedRoute.params.subscribe(({month, year}) => {
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
    this.year = year || moment().format('YYYY');
    this.month = month || moment().format('M');
    this.monthWord = moment(this.month, 'M').format('MMMM');
    this.prev = this.prevMonth();
    this.next = this.nextMonth();
  }

  ngOnDestroy() {
    this.params$.unsubscribe();
  }
}
