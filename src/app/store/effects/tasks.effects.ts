import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect, Effect } from '@ngrx/effects';
import { ADD_TASK, REMOVE_TASK } from '../actions/task.actions';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class TasksEffects {
    // @Effect() syncLocalStorage$ = this.actions$.pipe(
    //     ofType(REMOVE_TASK),
    //     map(action => action)
    // );

    constructor(private actions$: Actions) {}
}