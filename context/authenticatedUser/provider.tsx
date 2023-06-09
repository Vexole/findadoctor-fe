import { ReactNode, useEffect, useState } from 'react';
import { AuthenticatedUserContext } from '.';

type UserContextProviderProps = { children: ReactNode };

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const parseUser = () => {
      const user = localStorage.getItem('user');
      if (!user) return setUser(undefined);
      return setUser(JSON.parse(user));
    };

    parseUser();
    window.addEventListener('storage', parseUser);
    return () => window.removeEventListener('storage', parseUser);
  }, []);

  return (
    <AuthenticatedUserContext.Provider value={user}>{children}</AuthenticatedUserContext.Provider>
  );
};
