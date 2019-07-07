import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../models/task.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';
import { AddTask, RemoveTask } from '../store/actions/task.actions';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() public task: Task;
  @Input() public showDelete = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  delete() {
    this.store.dispatch(new RemoveTask(this.task));
  }

  drag(event) {
    console.log(event);
    event.dataTransfer.setData('id', this.task.id);
  }

}
