/**
 * @jest-environment jsdom
 */
import {
  addTask,
  deleteCompletedTasks,
  removeTask,
  updateTask,
} from '../__mocks__/crud.js';
import { loadStorage, updateStorage } from '../__mocks__/storage.js';

describe('dom add and remove', () => {
  test('add one item to the list', () => {
    addTask(1, false, 'task1');

    const tasks = loadStorage();

    const container = document.createElement('ul');
    container.innerHTML = '';
    tasks.forEach(() => {
      const li = document.createElement('li');
      container.appendChild(li);
    });
    const list = container.children;
    expect(list).toHaveLength(1);
    updateStorage([]);
  });

  test('remove one item from the list', () => {
    addTask(1, false, 'task1');
    removeTask(1);
    const tasks = loadStorage();

    const container = document.createElement('ul');
    container.innerHTML = '';
    tasks.forEach(() => {
      const li = document.createElement('li');
      container.appendChild(li);
    });
    const list = container.children;
    expect(list).toHaveLength(0);
    updateStorage([]);
  });
});

describe('dom manipulation', () => {
  test('check display of description of an item', () => {
    addTask(1, false, 'task1');
    const tasks = loadStorage();

    const container = document.createElement('ul');
    container.innerHTML = '';
    tasks.forEach((t) => {
      const li = document.createElement('li');
      const descInput = document.createElement('input');
      descInput.className = 'description';
      descInput.value = t.description;
      li.appendChild(descInput);
      container.appendChild(li);
    });

    expect(container.children[0].children[0].value).toMatch('task1');
    updateStorage([]);
  });

  test('check display of edited description of an item', () => {
    addTask(1, false, 'task1');
    updateTask(1, 'new description');
    const tasks = loadStorage();

    const container = document.createElement('ul');
    container.innerHTML = '';
    tasks.forEach((t) => {
      const li = document.createElement('li');
      const descInput = document.createElement('input');
      descInput.className = 'description';

      descInput.value = t.description;

      li.appendChild(descInput);
      container.appendChild(li);
    });

    expect(container.children[0].children[0].value).toMatch('new description');
    updateStorage([]);
  });

  test('delete 2 completed over 3 items', () => {
    addTask(1, true, 'task1');
    addTask(2, false, 'task2');
    addTask(3, true, 'task3');

    deleteCompletedTasks();
    const tasks = loadStorage();

    const container = document.createElement('ul');
    container.innerHTML = '';
    tasks.forEach(() => {
      const li = document.createElement('li');
      container.appendChild(li);
    });
    const list = container.children;
    expect(list).toHaveLength(1);
    updateStorage([]);
  });

  test('checkbox input checked if task completed', () => {
    addTask(1, true, 'task1');

    const tasks = loadStorage();

    const container = document.createElement('ul');
    container.innerHTML = '';
    tasks.forEach((element) => {
      const checkBox = document.createElement('input');
      checkBox.className = 'checkbox';
      if (element.completed) {
        checkBox.checked = true;
      }
      container.appendChild(checkBox);
    });
    const checkbox = container.children[0];
    expect(checkbox.checked).toBeTruthy();
    updateStorage([]);
  });
});
