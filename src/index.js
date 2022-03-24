import './style.css';
import { addTask } from './modules/crud.js';
import { loadStorage } from './modules/storage.js';

// Font Awesome 5 (Free)
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js'; // https://fontawesome.com/icons?d=gallery&s=solid&m=free
import '@fortawesome/fontawesome-free/js/regular.js'; // https://fontawesome.com/icons?d=gallery&s=regular&m=free
import '@fortawesome/fontawesome-free/js/brands.js'; // https://fontawesome.com/icons?d=gallery&s=brands&m=free

const container = document.getElementById('ctn-task-list');
const descInput = document.getElementById('input-txt');
const enterButton = document.getElementById('input-txt');

const orderTasks = (listTask) => listTask.sort((a, b) => a.index - b.index);

const populateHtml = (tasks) => {
  container.innerHTML = '';
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
    sIpt.readOnly = true;

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

enterButton.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const index = loadStorage().length + 1;
    const completed = false;
    const description = descInput.value;
    const task = addTask(index, completed, description);
    descInput.value = '';
    populateHtml(orderTasks(task));
  }
});

window.addEventListener('load', () => {
  populateHtml(orderTasks(loadStorage()));
});
