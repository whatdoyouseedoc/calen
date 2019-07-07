import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { selectTasksByDate, selectTaskById } from '../store/selectors/task.selector';
import { AppState } from '../store/state/app.state';
import * as moment from'moment';
import { ActivatedRoute } from '@angular/router';
import { AddTask, RemoveTask } from '../store/actions/task.actions';
import { IdGenService } from '../id-gen.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-day-list-item',
  templateUrl: './day-list-item.component.html',
  styleUrls: ['./day-list-item.component.scss']
})
export class DayListItemComponent implements OnInit {

  @Input() public date;
  public isInactive = false;
  public tasks$: Observable<Task[]>;
  public editMode = false;

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private idGen: IdGenService) {
  }

  ngOnInit() {
    this.isInactive = this.setIsInactive();
    this.tasks$ = this.store.pipe(select(selectTasksByDate, {date: moment(this.date).format('D-M-YYYY')}));
  }

  edit({target}) {
    this.editMode = true;
    this.closeOnLoosingFocus();
  }

  save(event) {
    const task = {
      id: this.idGen.getId(),
      date: moment(this.date).format('D-M-YYYY'),
      text: event.target.value
    };

    this.store.dispatch(new AddTask(task));
    event.target.value = '';
  }

  allowDrop(event) {
    event.preventDefault();
  }

  drop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData('id');
    this.store.pipe(select(selectTaskById, {id})).subscribe(it => {
      if (it.date !== moment(this.date).format('D-M-YYYY')) {
        let newTask = {...it, date: moment(this.date).format('D-M-YYYY')};
        this.store.dispatch(new RemoveTask(it));
        this.store.dispatch(new AddTask(newTask));
      }
    });
  }

  private setIsInactive() {
    let routeMonth = this.activatedRoute.snapshot.params['month'];
    let cellMonth = moment(this.date).format('M');

    return routeMonth !== cellMonth;
  }

  private closeOnLoosingFocus() {
    let blurHandler = (event) => {
      if (event.target.closest('.edit-popup') === null) {
        this.editMode = false;
        window.removeEventListener('click', blurHandler);
      }
    };
    setTimeout(() => {
      window.addEventListener('click', blurHandler);
    }, 0);
  }
}
