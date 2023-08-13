export const getUser = () => {
  if (typeof window !== 'undefined') {
    return localStorage.user ? JSON.parse(localStorage.user) : undefined;
  }
  return undefined;
};

export const getPaitent = () => {
  if (typeof window !== 'undefined') {
    return localStorage.patient ? JSON.parse(localStorage.patient) : undefined;
  }
  return undefined;
};

export const getUserId = () => {
  const authenticatedUser = getUser();
  return authenticatedUser ? authenticatedUser.userId : '';
};

export const logOut = () => {
  if (typeof window !== 'undefined') {
    localStorage.clear();
  }
};
