import { Task } from 'src/app/models/task.model';
import { TaskActions, ADD_TASK, REMOVE_TASK } from '../actions/task.actions';

export const defaultTasksState: Task[] = [
    {
        id: 'fm2aho9o1w5rocrw',
        date: '1-7-2019',
        text: 'Sample text 1 Sample text 1 Sample text 1'
    },
    {
        id: '3jvgiy2lder1k9bf',
        date: '1-7-2019',
        text: 'Sample text 2'
    },
    {
        id: 'm1poluc92npxdq00',
        date: '25-6-2019',
        text: 'Sample text 1337'
    }
];

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