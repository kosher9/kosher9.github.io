let storage = [];

export const loadStorage = () => storage;

export const updateStorage = (data) => {
  storage = [];
  storage = data;
};
