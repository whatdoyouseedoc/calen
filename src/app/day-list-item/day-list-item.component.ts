import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { selectTasksByDate } from '../store/selectors/task.selector';
import { AppState } from '../store/state/app.state';
import * as moment from'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-day-list-item',
  templateUrl: './day-list-item.component.html',
  styleUrls: ['./day-list-item.component.scss']
})
export class DayListItemComponent implements OnInit {

  @Input() public date;
  public isInactive = false;
  public tasks$: Observable<Task[]>;

  constructor(private store: Store<AppState>, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.isInactive = this.setIsInactive();

    this.tasks$ = this.store.pipe(select(selectTasksByDate, {date: moment(this.date).format('D-M-YYYY')}));
  }

  private setIsInactive() {
    let routeMonth = this.activatedRoute.snapshot.params['month'];
    let cellMonth = moment(this.date).format('M');

    return routeMonth !== cellMonth;
  }

}
