import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../models/task.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';
import { AddTask } from '../store/actions/task.actions';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() public task: Task;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  public edit() {
    console.log('On Edit');
    this.store.dispatch(new AddTask({
      index: 2,
      date: '2-7-2019',
      text: 'Sample text 3'
    }));
  }

}
