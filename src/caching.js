export const cacheObject = (key, object) => {
  localStorage.setItem(key, JSON.stringify(object));
};

export const getCachedObject = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const removeCachedObject = (key) => {
  localStorage.removeItem(key);
};