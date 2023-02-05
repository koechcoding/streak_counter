import Streaks from "./classes/streaks";
import {BestDoneTask} from "./classes/days";
import {Days} from "./classes/days";
import {Task} from "./classes/days";



let addBtn = document.querySelector("#add-btn")!;
let modal = document.querySelector('#modal-container')! as HTMLDivElement;
let modalContent = document.querySelector('.displayer-content')! as HTMLDivElement;
let taskContainer = document.querySelector('.task-container')! as HTMLDivElement;


addBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    modalContent.innerHTML = "";
    modalContent.innerHTML = clickTab;
    closeModal();
    inputValidation();


}
)

let clickTab: string = `
    <div class="main-template">
        <div><span class="close">&times;</span></div>
        <div class="menu-template-bar">
           <ion-icon name="menu-outline"></ion-icon>
           <p>Add A Todo Here</p>
        </div>
        <div class="form-group">
            <h1>Add task</h1>
            <form >
                <div class="input-group">
                    <label for="name">Task Name</label>
                    <input type="text" name="name" id="name" placeholder="name">
                </div>
                <div class="input-group">
                    <label for="task-icon">images</label>
                    <input type="text" name="task-icon" id="task-icon" placeholder="image url">
                </div>
                <div class="input-group">
                    <label for="date">Start Date</label>
                    <input type="date" name="date" id="date">
                </div>
                <button type="submit" id="submit-btn">Add task</button>
            </form>
        </div>
    </div>`

let streaks = new Streaks();
let task1 = new Task("Stop smoking", "", "2020-11-10");
let task2 = new Task("Bike riding", "", "2020-10-10");
streaks.tasks.push(task1);
streaks.tasks.push(task2);
let bestDoneTask = new BestDoneTask(streaks);

taskContainer.addEventListener("click", (e) => {
    console.log(e.target);
    // check if it is a delete button
    let target = e.target as HTMLElement;
    if (target.className == "task") {
        showSingle(Number(target.id));
    }
    if (target.className == "delete-btn") {
        deleteTask(Number(target.id));
    }
        
})

modalContent.addEventListener("click", (e) => {
    let target = e.target as HTMLElement;
    if (target.className == "delete-btn") {
        deleteTask(Number(target.id));
    }
})





const inputValidation = (): void => {
    let submitBtn = document.querySelector('#submit-btn')! as HTMLButtonElement;
    let formGroup = document.querySelector('.form-group')!;
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let taskName = document.querySelector('#name')! as HTMLInputElement;
        let taskIcon = document.querySelector('#task-icon')! as HTMLInputElement;
        let taskDate = document.querySelector('#date')! as HTMLInputElement;

        if (taskName.value == "" || taskIcon.value == "" || taskDate.value == "") {
            let error = document.querySelector('.error')! as HTMLParagraphElement;
            if (error) {
                error.remove();
            }
            formGroup.insertAdjacentHTML("afterbegin", `<p class="error">Please fill all the fields</p>`)
            let taskName = document.querySelector('#name')! as HTMLInputElement;
            let taskIcon = document.querySelector('#task-icon')! as HTMLInputElement;
            let taskDate = document.querySelector('#date')! as HTMLInputElement;
            if (taskName.value == "") {
                taskName.style.border = "1px solid red";
            }
            setTimeout(() => {
                let error = document.querySelector('.error')! as HTMLParagraphElement;
                if (error) {
                    error.remove();
                }
                taskName.style.border = "1px solid #ccc";
                taskIcon.style.border = "1px solid #ccc";
                taskDate.style.border = "1px solid #ccc";
            },5000)


        }
        else {
            let task = new Task(taskName.value, taskIcon.value, taskDate.value);
            streaks.tasks.push(task);
            renderTasks();
            modal.style.display = "none";
        }

    })
}

const closeModal = (): void => {
    let closeBtn = document.querySelector('.close')! as HTMLSpanElement;
    let task = document.querySelector('.task-well-done')! as HTMLDivElement;
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        let formGroup = document.querySelector('.form-group')!;
        if (formGroup) {
            formGroup.remove();
        }
        if (task) {
            task.remove();
        }
    })
}



const deleteTask = (id: number) => {
    let task = streaks.tasks.find((task) => task.id == id);
    let index = streaks.tasks.indexOf(task!);
    streaks.tasks.splice(index,1);
    renderTasks();
    modal.style.display = "none";
} 
const showSingle = (id: number) => {
    let Task = streaks.tasks.find((Task) => Task.id == id);
    modalContent.innerHTML = "";
    modal.style.display = "flex";
    let singleTaskTemplate = `
    <span class="close">&times;</span>
    <div class="task">
        <img src="${Task?.imageUrl}" alt="task">
        <p class="date">${Task?.date}</p>
        <p class="days">Days: ${Days.create(Task!).getDays()}</p>
        <p class="task-name">${Task!.name}</p>
        <div class="modal-btn">
        <button id="modal-close-btn" onclick="let modal = document.querySelector('#my-modal');modal.style.display = 'none'">Close</button>
            <button class="delete-btn" id="${Task!.id}">Delete</button>
        </div>
    </div>`
    
    if (Task){
        modalContent.innerHTML = singleTaskTemplate;
        closeModal();
    }
    else{
        modalContent.innerHTML = "<p>Task not found</p>"
    }

}


const renderTasks = (): void => {
    taskContainer.innerHTML = "";
    streaks.tasks.forEach((task) => {
        let taskTemplate = `
        <div class="task" id="${task.id}">
            <img src="${task.imageUrl}" alt="${task.name}">
            <p class="date">${task.date}</p>
            <p>Days done: ${Days.create(task).getDays()}</p>
            <p class="task-name">${task.name}</p>
        </div>
        
        `
        taskContainer.insertAdjacentHTML("afterbegin", taskTemplate);
    }
    )
}


setTimeout(() => {
    let task = bestDoneTask.getBest()
    streaks.tasks.push(task);
    modal.style.display = "flex";
    modalContent.innerHTML = "";
    let singleTaskTemplate = `
    <span class="close">&times;</span>
    <div class='task-well-done'>
    <p>Congratulations! Task well done</p>
    <div class="task">
   
        <img src="${task.imageUrl}" alt="task">
        <p class="date">${task.date}</p>
        <p class="days"> ${Days.create(task).getDays()} days ago</p>
        <p class="task-name">${task.name}</p>
        <div class="modal-btn">
        <button id="modal-close-btn" onclick="let modal = document.querySelector('#my-modal');modal.style.display = 'none'">Close</button>
        <button class="delete-btn" id="${task!.id}">Delete</button>
        </div>
    </div>
    </div>`
    modalContent.innerHTML += singleTaskTemplate;
    closeModal();
},50000)