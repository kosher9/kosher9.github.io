import { loadStorage, updateStorage } from './storage.js';

export default function isComplete(index) {
  const tasks = loadStorage();
  tasks[index - 1].completed = !tasks[index - 1].completed;
  updateStorage(tasks);
}
