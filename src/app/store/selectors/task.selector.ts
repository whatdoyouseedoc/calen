import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { Task } from 'src/app/models/task.model';

const selectTasks = (state: AppState) => state.tasks;

export const selectTasksByDate = createSelector(
    selectTasks,
    (state: Task[], props) => state.filter(it => it.date === props.date)
);