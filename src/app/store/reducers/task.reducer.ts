import { Task } from 'src/app/models/task.model';
import { TaskActions, ADD_TASK } from '../actions/task.actions';

export const defaultTasksState: Task[] = [
    {
        index: 0,
        date: '1-7-2019',
        text: 'Sample text 1 Sample text 1 Sample text 1'
    },
    {
        index: 1,
        date: '1-7-2019',
        text: 'Sample text 2'
    },
    {
        index: 0,
        date: '25-6-2019',
        text: 'Sample text 1337'
    }
];

export function TaskReducer(state: Task[] = defaultTasksState, action: TaskActions) {
    switch (action.type) {
        case ADD_TASK:
            return [...state, action.payload];
        default:
            return state;
    }
}