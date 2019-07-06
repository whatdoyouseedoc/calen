import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { selectTasksByDate } from '../store/selectors/task.selector';
import { AppState } from '../store/state/app.state';
import * as moment from'moment';

@Component({
  selector: 'app-day-list-item',
  templateUrl: './day-list-item.component.html',
  styleUrls: ['./day-list-item.component.scss']
})
export class DayListItemComponent implements OnInit {

  @Input() public date;
  public tasks$: Observable<Task[]>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.tasks$ = this.store.pipe(select(selectTasksByDate, {date: moment(this.date).format('D-M-YYYY')}));
  }

}
