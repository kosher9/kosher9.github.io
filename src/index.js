import './style.css';
import Task from './modules/task.js';

// Font Awesome 5 (Free)
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js'; // https://fontawesome.com/icons?d=gallery&s=solid&m=free
import '@fortawesome/fontawesome-free/js/regular.js'; // https://fontawesome.com/icons?d=gallery&s=regular&m=free
import '@fortawesome/fontawesome-free/js/brands.js'; // https://fontawesome.com/icons?d=gallery&s=brands&m=free

const container = document.getElementById('ctn-task-list');

const task1 = new Task(1, false, 'wash the dishes');
const task2 = new Task(0, false, 'complete To Do list project');
const task3 = new Task(3, false, "Let's do one more");

const taskList = [task1, task2, task3];

const orderTasks = (listTask) => listTask.sort((a, b) => a.index - b.index);

const populateHtml = (tasks) => {
  tasks.forEach((element) => {
    const li = document.createElement('li');
    const fDiv = document.createElement('div');
    const sDiv = document.createElement('div');
    const fIpt = document.createElement('input');
    const sIpt = document.createElement('input');
    const iDiv = document.createElement('div');
    const icon = document.createElement('i');
    const line = document.createElement('div');

    fDiv.className = 'ctn-task';
    sDiv.className = 'ctn-left';
    fIpt.className = 'checkbox';
    sIpt.className = 'description';
    iDiv.className = 'ctn-icon';
    icon.className = 'fa-solid fa-ellipsis-vertical';
    line.className = 'line';

    fIpt.setAttribute('type', 'checkbox');

    sIpt.setAttribute('type', 'text');
    sIpt.value = element.description;

    sDiv.appendChild(fIpt);
    sDiv.appendChild(sIpt);
    iDiv.appendChild(icon);
    fDiv.appendChild(sDiv);
    fDiv.appendChild(iDiv);
    li.appendChild(fDiv);
    li.appendChild(line);
    container.appendChild(li);
  });
};

window.addEventListener('load', () => {
  populateHtml(orderTasks(taskList));
});
