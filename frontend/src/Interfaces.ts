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

export interface OutputUserCreation{
    email: string;
    name: string;
    surname: string;
    password: string;
}

export interface UserDB{
    id: number;
    email: string;
    name: string;
    surname: string;
}

export interface OutputUserConnection{
    email: string;
    password: string;
}

export interface userContext {
    id: number;
    email: string;
    name: string;
    surname: string;
}