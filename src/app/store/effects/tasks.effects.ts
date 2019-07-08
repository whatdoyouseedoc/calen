import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect, Effect } from '@ngrx/effects';
import { ADD_TASK, REMOVE_TASK, SYNC_AND_ADD, AddTask, TaskActions } from '../actions/task.actions';
import { tap, map, mergeMap, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { of, timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

const syncLocalStorage = state => {
  localStorage.setItem('tasksState', JSON.stringify(state));
}

@Injectable()
export class TasksEffects {

    constructor(private actions$: Actions, private store: Store<AppState>) {}

    @Effect({dispatch: false})
    syncAndAdd$ = this.actions$.pipe(
      ofType<TaskActions>(ADD_TASK),
      withLatestFrom(this.store),
      map(([action, storeState]) => storeState),
      tap(({tasks}) => {
        syncLocalStorage(tasks);
      })
    );
}
