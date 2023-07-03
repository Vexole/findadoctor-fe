import { createContext, useContext } from 'react';

type AuthenticatedUser = {
  email: string;
  role: string;
  token: string;
  userId: string;
  userRefreshToken: string;
  isProfileComplete: boolean;
  isPasswordChangeRequired: boolean;
};

export const AuthenticatedUserContext = createContext<AuthenticatedUser | undefined>(undefined);

export const useAuthenticatedUserContext = () => useContext(AuthenticatedUserContext);
