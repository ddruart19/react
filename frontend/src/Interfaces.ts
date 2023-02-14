export interface ITask{
    id: number;
    name: string;
    completed: boolean;
    date: Date;
}

export interface ITaskDB{
    id: number;
    name: string;
    completed : boolean;
    date: Date;
}

export interface OutputTaskCreation{
    name: string;
    completed : boolean;
    date: Date;
}

export interface OutputTaskUpdate{
    name: string;
    completed : boolean;
    date: Date;
    id : number;
}