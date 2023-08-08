export const getLocalStorage = () =>
  typeof window === 'undefined' ? ({} as Storage) : localStorage;

export const getLocalStorageItem = (type: string) =>
  typeof window === 'undefined'
    ? undefined
    : getLocalStorage()[type] === undefined
    ? undefined
    : JSON.parse(getLocalStorage()[type]);

export const getUser = () => getLocalStorageItem('user');

export const getUserId = () => getUser()?.userId || '';

export const logOut = () => {
  getLocalStorage().clear();
};
