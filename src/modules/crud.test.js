import {
  addTask,
  removeTask,
  updateTask,
  deleteCompletedTasks,
} from '../__mocks__/crud.js';
import isComplete from '../__mocks__/state.js';
import { loadStorage, updateStorage } from '../__mocks__/storage.js';

describe('crud', () => {
  test('add task', () => {
    expect(addTask(1, false, 'love life')).toEqual([
      { index: 1, completed: false, description: 'love life' },
    ]);
    updateStorage([]);
  });

  test('remove task', () => {
    addTask(1, false, 'task1');
    addTask(2, false, 'task2');
    addTask(3, false, 'task3');
    expect(removeTask(1)).toEqual([
      {
        completed: false,
        description: 'task2',
        index: 1,
      },
      {
        completed: false,
        description: 'task3',
        index: 2,
      },
    ]);
    updateStorage([]);
  });

  test('edit task', () => {
    addTask(1, false, 'task1');
    updateTask(1, 'new description');
    expect(loadStorage()).toEqual([
      {
        completed: false,
        description: 'new description',
        index: 1,
      },
    ]);
    updateStorage([]);
  });

  test('update task to completed', () => {
    addTask(1, false, 'task1');
    isComplete(1);
    expect(loadStorage()).toEqual([
      { index: 1, completed: true, description: 'task1' },
    ]);
    updateStorage([]);
  });

  test('clear all completed tasks', () => {
    addTask(1, true, 'task1');
    addTask(2, false, 'task2');
    addTask(3, true, 'task3');
    deleteCompletedTasks();
    expect(loadStorage()).toEqual([
      {
        completed: false,
        description: 'task2',
        index: 1,
      },
    ]);
    updateStorage([]);
  });
});
