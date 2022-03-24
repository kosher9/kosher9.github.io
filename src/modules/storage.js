export const loadStorage = () => {
  if (localStorage.getItem('tasks') === null) {
    localStorage.setItem('tasks', JSON.stringify([]));
    return [];
  }
  return JSON.parse(localStorage.getItem('tasks'));
};

export const updateStorage = (data) => {
  localStorage.setItem('tasks', JSON.stringify(data));
};
