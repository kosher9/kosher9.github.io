import './style.css'
import Image from './img/refresh.png'

// Font Awesome 5 (Free)
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid' // https://fontawesome.com/icons?d=gallery&s=solid&m=free
import '@fortawesome/fontawesome-free/js/regular' // https://fontawesome.com/icons?d=gallery&s=regular&m=free
import '@fortawesome/fontawesome-free/js/brands' // https://fontawesome.com/icons?d=gallery&s=brands&m=free

class Task{

    constructor(index, completed, description){
        this.index = index
        this.completed = completed
        this.description = description
    }

}

let task1 = Task(0, false, "wash the dishes")
let task2 = Task(1, false, "complete To Do list project")
let task3 = Task(3, false, "Let's do one more")

let taskList = [task1, task2, task3]

const populateHtml = (listTask) => {
    listTask.array.forEach(element => {
        
    });
}

window.addEventListener('load', () => {
    populateHtml(taskList)
})