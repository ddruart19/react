export interface TaskInputCreate{
    name: string;
    completed: boolean;
    date: Date;
    user_id: number;
}

export interface TaskInputUpdate{
    name: string;
    completed: boolean;
    date: Date;
}

export interface TaskOutput{
    id: number;
    name: string;
    completed: boolean;
    date: Date;
    user_id: number;
}