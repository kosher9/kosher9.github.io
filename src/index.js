class Task{

    constructor(index, completed, description){
        this.index = index
        this.completed = completed
        this.description = description
    }

}

let task1 = Task(0, false, "wash the dishes")
let task2 = Task(1, false, "complete To Do list project")

let taskList = [task1, task2]

const populateHtml = (listTask) => {
    listTask.array.forEach(element => {
        
    });
}

window.addEventListener('load', () => {
    populateHtml(taskList)
})