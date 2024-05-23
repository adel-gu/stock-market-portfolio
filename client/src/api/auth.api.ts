import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { SignUpInputsType } from '../pages/SignUp';
import { LoginInputsType } from '../pages/Login';
import { IUser, useAuthContext } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:5050/api/v1/' + 'users';

interface IResponse {
  status: string;
  data: IUser;
}

export const useSignUpUser = () => {
  const { showToast } = useAuthContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const signUpUserRequest = async (data: SignUpInputsType) => {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Error signing up user');
  };

  const { mutateAsync: signUpUser, isPending } = useMutation({
    mutationKey: ['signUpUser'],
    mutationFn: signUpUserRequest,
    onSuccess: async () => {
      showToast({ message: 'Account added successfully', type: 'SUCCESS' });
      await queryClient.invalidateQueries({ queryKey: ['verifyUser'] });
      navigate('/');
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: 'ERROR' });
    },
  });

  return {
    isPending,
    signUpUser,
  };
};

export const useLoginUser = () => {
  const { showToast } = useAuthContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const loginUserRequest = async (data: LoginInputsType) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Error signing up user');
  };

  const { mutateAsync: loginUser, isPending } = useMutation({
    mutationKey: ['loginUser'],
    mutationFn: loginUserRequest,
    onSuccess: async () => {
      showToast({ message: 'User logged in successfully!', type: 'SUCCESS' });
      await queryClient.invalidateQueries({ queryKey: ['verifyUser'] });
      navigate('/');
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: 'ERROR' });
    },
  });

  return {
    isPending,
    loginUser,
  };
};

export const useVerifyUser = (): IUser | undefined => {
  const verifyUserRequest = async (): Promise<IResponse | undefined> => {
    const response = await fetch(`${API_BASE_URL}/get-current-user`, {
      credentials: 'include',
    });

    if (!response.ok) throw new Error('Error signing up user');
    return await response.json();
  };

  const { data } = useQuery({
    queryKey: ['verifyUser'],
    queryFn: verifyUserRequest,
    retry: false,
  });

  const user = data?.data;

  return user;
};
