import { loadStorage, updateStorage } from './storage.js';
import Task from './task.js';

export const addTask = (index, completed, description) => {
  const task = new Task(index, completed, description);
  const tasks = loadStorage();
  tasks.push(task);
  updateStorage(tasks);
  return loadStorage();
};

export const updateIndex = (index) => {
  const tasks = loadStorage();
  const updatedIndexTasks = [];
  tasks.array.forEach((element) => {
    if (element.id > index) {
      element.id -= 1;
      updatedIndexTasks.push(element.id);
    } else {
      updatedIndexTasks.push(element);
    }
  });
  updateStorage(updatedIndexTasks);
};

export const removeTask = (index) => {
  const tasks = loadStorage();
  const newTasks = tasks.filter((item) => item.id !== index);
  updateStorage(newTasks);
  updateIndex(index);
  return loadStorage();
};

export const updateTask = (index, description) => {
  const tasks = loadStorage();
  const id = tasks.findIndex((item) => item.id === index);
  tasks[id + 1].description = description;
  updateStorage(tasks);
};
