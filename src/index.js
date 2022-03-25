import './style.css';
import {
  addTask,
  removeTask,
  updateTask,
  deleteCompletedTasks,
} from './modules/crud.js';
import { loadStorage } from './modules/storage.js';
import isComplete from './modules/state.js';

// Font Awesome 5 (Free)
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js'; // https://fontawesome.com/icons?d=gallery&s=solid&m=free
import '@fortawesome/fontawesome-free/js/regular.js'; // https://fontawesome.com/icons?d=gallery&s=regular&m=free
import '@fortawesome/fontawesome-free/js/brands.js'; // https://fontawesome.com/icons?d=gallery&s=brands&m=free

const container = document.getElementById('ctn-task-list');
const descInput = document.getElementById('input-txt');
const enterButton = document.getElementById('ctn-icon-arrow');
const cmpltTaskButton = document.getElementById('erase-div');

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
    const oDiv = document.createElement('div');
    const dDiv = document.createElement('div');
    const iconOpt = document.createElement('i');
    const iconDel = document.createElement('i');
    const line = document.createElement('div');

    fDiv.className = 'ctn-task';
    sDiv.className = 'ctn-left';
    fIpt.className = 'checkbox';
    sIpt.className = 'description';
    iDiv.className = 'ctn-icon';
    iconOpt.className = 'fa-solid fa-ellipsis-vertical';
    iconDel.className = 'fa-solid fa-trash-can';
    line.className = 'line';

    fIpt.setAttribute('type', 'checkbox');

    sIpt.setAttribute('type', 'text');
    dDiv.style.display = 'none';
    sIpt.value = element.description;
    sIpt.readOnly = true;

    if (element.completed) {
      fIpt.checked = true;
    }

    sDiv.appendChild(fIpt);
    sDiv.appendChild(sIpt);
    oDiv.appendChild(iconOpt);
    dDiv.appendChild(iconDel);
    iDiv.appendChild(oDiv);
    iDiv.appendChild(dDiv);
    fDiv.appendChild(sDiv);
    fDiv.appendChild(iDiv);
    li.appendChild(fDiv);
    li.appendChild(line);
    container.appendChild(li);

    oDiv.addEventListener('click', () => {
      if (sIpt.readOnly) {
        sIpt.readOnly = false;
        oDiv.style.display = 'none';
        dDiv.style.display = 'block';
        li.style.backgroundColor = 'rgb(235, 252, 231)';
        sIpt.style.backgroundColor = 'rgb(235, 252, 231)';
      }
    });

    sIpt.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        sIpt.readOnly = true;
        oDiv.style.display = 'block';
        dDiv.style.display = 'none';
        li.style.backgroundColor = 'white';
        sIpt.style.backgroundColor = 'white';
        updateTask(element.index, sIpt.value);
      }
    });

    dDiv.addEventListener('click', () => {
      removeTask(element.index);
      populateHtml(orderTasks(loadStorage()));
    });

    fIpt.addEventListener('click', () => {
      isComplete(element.index);
    });
  });
};

enterButton.addEventListener('click', () => {
  if (descInput.value !== '') {
    const index = loadStorage().length + 1;
    const completed = false;
    const description = descInput.value;
    const task = addTask(index, completed, description);
    descInput.value = '';
    populateHtml(orderTasks(task));
  }
});

descInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    if (descInput.value !== '') {
      const index = loadStorage().length + 1;
      const completed = false;
      const description = descInput.value;
      const task = addTask(index, completed, description);
      descInput.value = '';
      populateHtml(orderTasks(task));
    }
  }
});

cmpltTaskButton.addEventListener('click', () => {
  deleteCompletedTasks();
  populateHtml(orderTasks(loadStorage()));
});

window.addEventListener('load', () => {
  populateHtml(orderTasks(loadStorage()));
});
