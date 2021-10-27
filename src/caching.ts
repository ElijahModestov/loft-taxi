export const cacheObject = (key: string, object: object): void => {
  localStorage.setItem(key, JSON.stringify(object) as string);
};

export const getCachedObject = (key: string): object => {
  return JSON.parse(localStorage.getItem(key) as string);
};

export const removeCachedObject = (key: string): void => {
  localStorage.removeItem(key);
};