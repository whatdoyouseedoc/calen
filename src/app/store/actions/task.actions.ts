import { Action } from '@ngrx/store';
import { Task } from 'src/app/models/task.model';

export const ADD_TASK = '[TASK] Add Task';
export const REMOVE_TASK = '[TASK] Add Remove';

export class AddTask implements Action {
    readonly type = ADD_TASK;
    constructor(public payload: Task) {}
}

export class RemoveTask implements Action {
    readonly type = REMOVE_TASK;
    constructor(public payload: Task) {}
}

export type TaskActions = AddTask | RemoveTask;