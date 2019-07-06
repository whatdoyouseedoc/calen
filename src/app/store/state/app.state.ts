import { Task } from 'src/app/models/task.model';

export interface AppState {
    readonly tasks: Task[];
}