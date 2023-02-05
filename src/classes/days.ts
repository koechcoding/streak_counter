import {BestInterface} from '../interfaces/taskInterface';
import StreakCounter from './streaks';
import {TaskInterface}  from '../interfaces/taskInterface';

export class Task implements TaskInterface {
    id: number;
    name: string;
    imageUrl: string;
    date: string;
    constructor(name: string, imageUrl: string, date: string) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.date = date;
        this.id = this.generateId();

    }
    generateId(): number {
        return Math.floor(Math.random() * 1000000000);
    }
}

export class Days{
    private task: Task;
    private constructor(task: Task) {
        this.task = task;
    }
    static create(task: Task): Days {
        return new Days(task);
    }
    getDays(): number {
        const date = new Date(this.task.date);
        const today = new Date();
        const timeDiff = Math.abs(today.getTime() - date.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    }

}

export class BestDoneTask implements BestInterface {
    streakCounter: StreakCounter;
    constructor(streakCounter: StreakCounter) {
        this.streakCounter = streakCounter;
    }
    getBest(): Task {
        // return task with the most done days 
        let bestTask: Task = this.streakCounter.tasks[0];
        for (let i = 0; i < this.streakCounter.tasks.length; i++) {
            if (Days.create(this.streakCounter.tasks[i]).getDays()> Days.create(bestTask).getDays()) {
                bestTask = this.streakCounter.tasks[i];
            }
        }
        return bestTask;

    }
}

