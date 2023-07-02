export const getUser = () => {
  return localStorage.user ? JSON.parse(localStorage.user) : {};
};

export const getUserId = () => {
  const authenticatedUser = getUser();
  return authenticatedUser ? authenticatedUser.userId : '';
};

export const logOut = () => {
  localStorage.clear();
};
