import { ReactNode, useMemo } from 'react';
import { AuthenticatedUserContext } from '.';

type UserContextProviderProps = { children: ReactNode };

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const user = useMemo(() => {
    if (!localStorage.user) return {};
    return JSON.parse(localStorage.user);
  }, [localStorage.user]);
  return (
    <AuthenticatedUserContext.Provider value={user}>{children}</AuthenticatedUserContext.Provider>
  );
};
