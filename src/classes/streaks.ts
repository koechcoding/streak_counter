import  { Task } from './days';
import { StreakCounterInterface } from '../interfaces/taskInterface';

class  Streaks  implements  StreakCounterInterface {
    tasks: Task[];
    constructor() {
        this.tasks = [];
    }
}

export default Streaks;