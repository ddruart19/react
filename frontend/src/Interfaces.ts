export interface ITask{
    id: number;
    taskName: string;
    completed: boolean;
    date: Date;
}

export interface ITaskDB{
    id: number;
    name: string;
    completed : boolean;
    date: Date;
}

export interface OutputTask{
    name: string;
    completed : boolean;
    date: Date;
}