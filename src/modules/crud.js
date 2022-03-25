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
  tasks.forEach((element) => {
    if (element.index > index) {
      element.index -= 1;
      updatedIndexTasks.push(element);
    } else {
      updatedIndexTasks.push(element);
    }
  });
  updateStorage(updatedIndexTasks);
};

export const removeTask = (index) => {
  const tasks = loadStorage();
  const newTasks = tasks.filter((item) => item.index !== index);
  updateStorage(newTasks);
  updateIndex(index);
  return loadStorage();
};

export const updateTask = (index, description) => {
  const tasks = loadStorage();
  const id = tasks.findIndex((item) => item.index === index - 1);
  tasks[id + 1].description = description;
  updateStorage(tasks);
};

export const deleteCompletedTasks = () => {
  const tasks = loadStorage().filter((item) => item.completed === false);
  Object.keys(tasks).forEach((key) => {
    tasks[key].index = parseInt(key, 10) + 1;
  });
  updateStorage(tasks);
};
