import { Task } from 'src/app/models/task.model';
import { TaskActions, ADD_TASK, REMOVE_TASK } from '../actions/task.actions';

export const defaultTasksState: Task[] = JSON.parse(localStorage.getItem('tasksState')) || [];

export function TaskReducer(state: Task[] = defaultTasksState, action: TaskActions) {
    switch (action.type) {
        case ADD_TASK:
            return [...state, action.payload];
        case REMOVE_TASK:
            let i = state.indexOf(action.payload);
            state.splice(i, 1);
            return state;
        default:
            return state;
    }
}
