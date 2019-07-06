import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {

  tasks: Observable<Task[]>;

  constructor(private store: Store<AppState>) {
    this.tasks = store.select('tasks');
  }

  ngOnInit() {
  }

}
