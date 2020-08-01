import {Task} from "./task";

export class ListTasks {
    id: number;
    title: string;
    createD: Date;
    completeD: Date;
    complete: boolean;
    tasks: Task[];

    constructor(title: string) {
        this.id = new Date().getTime();
        this.title = title;
        this.createD = new Date();
        this.complete = false;
        this.tasks = [];
    }
}
