import React, { useState } from 'react';
import { createContext, useContext } from 'react';
import { useVerifyUser } from '../api/auth.api';
import Toast from '../components/Toast';

// user, isLoggedIn
interface Props {
  children: React.ReactNode;
}

export interface IUser {
  name: string;
  email: string;
}

type ToastMessage = {
  message: string;
  type: 'SUCCESS' | 'ERROR';
};

type AuthContextType = {
  user: IUser | undefined;
  isLoggedIn: boolean;
  showToast: (toastMessage: ToastMessage) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider = ({ children }: Props) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const user = useVerifyUser();
  console.log('DATA: ', user);

  const value = {
    user,
    isLoggedIn: !!user,
    showToast: (toastMessage: ToastMessage) => {
      setToast(toastMessage);
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context as AuthContextType;
};
export default AuthContextProvider;
