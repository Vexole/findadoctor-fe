import { ReactNode, useEffect, useMemo, useState } from 'react';
import { AuthenticatedUserContext } from '.';
import { getUser } from '@/utils/userUtils';

type UserContextProviderProps = { children: ReactNode };

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const user = useMemo(() => getUser(), [getUser()]);

  return (
    <AuthenticatedUserContext.Provider value={user}>{children}</AuthenticatedUserContext.Provider>
  );
};
