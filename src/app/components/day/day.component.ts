import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { IdGenService } from '../../id-gen.service';
import { Task } from '../../models/task.model';
import { AddTask, RemoveTask } from '../../store/actions/task.actions';
import { selectTaskById, selectTasksByDate } from '../../store/selectors/task.selector';
import { AppState } from '../../store/state/app.state';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {

  private _date: string;
  @Input()
  public set date(date: string) {
    this._date = date;
    this.popupLeftAlign = this.popupOnLeft();
  }

  public get date() {
    return this._date;
  }

  public popupLeftAlign = false;
  public tasks$: Observable<Task[]>;
  public editMode = false;

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private idGen: IdGenService) {
  }

  ngOnInit() {
    this.tasks$ = this.store.pipe(
      select(selectTasksByDate, {date: moment(this.date).format('D-M-YYYY')})
    );
  }

  edit() {
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

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  drop(event: DragEvent) {
    event.preventDefault();
    const id = event.dataTransfer.getData('id');
    this.store.pipe(first(), select(selectTaskById, {id})).subscribe(it => {
      if (it.date !== moment(this.date).format('D-M-YYYY')) {
        const newTask = {...it, date: moment(this.date).format('D-M-YYYY')};
        this.store.dispatch(new RemoveTask(it));
        this.store.dispatch(new AddTask(newTask));
      }
    });
  }

  popupOnLeft() {
    return ['Friday', 'Saturday', 'Sunday'].includes(moment(this.date).format('dddd'));
  }

  public trackByFn(item: Task) {
    return item.id;
  }

  public setIsInactive() {
    const routeMonth = this.activatedRoute.snapshot.params.month || moment().format('M');
    const cellMonth = moment(this.date).format('M');

    return routeMonth !== cellMonth;
  }

  private closeOnLoosingFocus() {
    const blurHandler = (event) => {
      if (event.target.closest('.edit-popup') === null) {
        this.editMode = false;
        document.body.removeEventListener('click', blurHandler);
        document.body.removeEventListener('keydown', escHandler);
      }
    };

    const escHandler = ({keyCode}) => {
      if (keyCode === 27) {
        this.editMode = false;
        document.body.removeEventListener('click', blurHandler);
        document.body.removeEventListener('keydown', escHandler);
      }
    };

    setTimeout(() => {
      document.body.addEventListener('click', blurHandler);
      document.body.addEventListener('keydown', escHandler);
    });
  }
}
