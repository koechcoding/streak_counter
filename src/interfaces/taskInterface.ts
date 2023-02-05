import {Task} from '../classes/days';
import streakCounter from "../classes/streaks";
import StreakCounter from '../classes/streaks';



export interface StreakCounterInterface {
    tasks: Task[];
}

// export default StreakCounterInterface;
export interface BestInterface {
    streakCounter: streakCounter;
    getBest(): Task;
}

// export default BestInterface;

export interface TaskInterface {
    id: number;
    name: string;
    imageUrl: string;
    date: string;
}
