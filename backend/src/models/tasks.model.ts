export interface TaskInput{
    name: string;
    completed: boolean;
    date: Date;
    user_id: number;
}

export interface TaskOutput{
    id: number;
    name: string;
    completed: boolean;
    date: Date;
    user_id: number;
}