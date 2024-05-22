import React from 'react';
import { createContext, useContext } from 'react';
import { useVerifyUser } from '../api/auth.api';

// user, isLoggedIn
interface Props {
  children: React.ReactNode;
}

export interface IUser {
  name: string;
  email: string;
}

type AuthContextType = {
  user: IUser | undefined;
  isLoggedIn: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider = ({ children }: Props) => {
  const user = useVerifyUser();
  console.log('DATA: ', user);

  const value = {
    user,
    isLoggedIn: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context as AuthContextType;
};
export default AuthContextProvider;
