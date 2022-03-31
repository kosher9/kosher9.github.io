import './style.css';
import {
  addTask,
  removeTask,
  updateTask,
  deleteCompletedTasks,
} from './modules/crud.js';
import { loadStorage } from './modules/storage.js';
import isComplete from './modules/state.js';

import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import '@fortawesome/fontawesome-free/js/brands.js';

const container = document.getElementById('ctn-task-list');
const descInput = document.getElementById('input-txt');
const enterButton = document.getElementById('ctn-icon-arrow');
const cmpltTaskButton = document.getElementById('erase-div');

const populateHtml = (tasks) => {
  container.innerHTML = '';
  tasks.forEach((element) => {
    const li = document.createElement('li');
    const leftDiv = document.createElement('div');
    const rightDiv = document.createElement('div');
    const checkBox = document.createElement('input');
    const descInput = document.createElement('input');
    const iconCtn = document.createElement('div');
    const optDiv = document.createElement('div');
    const delDiv = document.createElement('div');
    const iconOpt = document.createElement('i');
    const iconDel = document.createElement('i');
    const line = document.createElement('div');

    leftDiv.className = 'ctn-task';
    rightDiv.className = 'ctn-left';
    checkBox.className = 'checkbox';
    descInput.className = 'description';
    iconCtn.className = 'ctn-icon';
    iconOpt.className = 'fa-solid fa-ellipsis-vertical';
    iconDel.className = 'fa-solid fa-trash-can';
    line.className = 'line';

    checkBox.setAttribute('type', 'checkbox');

    descInput.setAttribute('type', 'text');
    delDiv.style.display = 'none';
    descInput.value = element.description;
    descInput.readOnly = true;

    if (element.completed) {
      checkBox.checked = true;
    }

    rightDiv.appendChild(checkBox);
    rightDiv.appendChild(descInput);
    optDiv.appendChild(iconOpt);
    delDiv.appendChild(iconDel);
    iconCtn.appendChild(optDiv);
    iconCtn.appendChild(delDiv);
    leftDiv.appendChild(rightDiv);
    leftDiv.appendChild(iconCtn);
    li.appendChild(leftDiv);
    li.appendChild(line);
    container.appendChild(li);

    optDiv.addEventListener('click', () => {
      if (descInput.readOnly) {
        descInput.readOnly = false;
        optDiv.style.display = 'none';
        delDiv.style.display = 'block';
        li.style.backgroundColor = 'rgb(235, 252, 231)';
        descInput.style.backgroundColor = 'rgb(235, 252, 231)';
      }
    });

    descInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        descInput.readOnly = true;
        optDiv.style.display = 'block';
        delDiv.style.display = 'none';
        li.style.backgroundColor = 'white';
        descInput.style.backgroundColor = 'white';
        updateTask(element.index, descInput.value);
      }
    });

    delDiv.addEventListener('click', () => {
      removeTask(element.index);
      populateHtml(loadStorage());
    });

    checkBox.addEventListener('click', () => {
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
    populateHtml(task);
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
      populateHtml(task);
    }
  }
});

cmpltTaskButton.addEventListener('click', () => {
  deleteCompletedTasks();
  populateHtml(loadStorage());
});

window.addEventListener('load', () => {
  populateHtml(loadStorage());
});
