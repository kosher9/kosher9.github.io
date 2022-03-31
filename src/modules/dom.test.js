/**
 * @jest-environment jsdom
 */
import { test } from 'media-typer';
import { addTask, removeTask } from '../__mocks__/crud.js';
import { loadStorage } from '../__mocks__/storage.js';

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
  });
});

describe('dom events', () => {
  // test()
});
