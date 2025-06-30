export enum Status {
    todo = "todo",
    in_progress = "in_progress",
    completed = "completed",
}

export type Todo = {
    id: number;
    description: string;
    status: Status;
    time: Date;
}