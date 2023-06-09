import { createContext, useContext } from "react";

type AuthenticatedUser = {email: string, role: string, token: string, userId: string, userRefreshToken: string}

export const AuthenticatedUserContext = createContext<AuthenticatedUser | undefined>(undefined);

export const useAuthenticatedUserContext = () => useContext(AuthenticatedUserContext);