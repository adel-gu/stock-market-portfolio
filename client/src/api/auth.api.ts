import { useMutation } from '@tanstack/react-query';
import { SignUpInputsType } from '../pages/SignUp';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5050/api/v1/' + 'users';

export const useSignUpUser = () => {
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
      navigate('/');
    },
    onError: (err: Error) => {
      console.log(err.message);
    },
  });

  return {
    isPending,
    signUpUser,
  };
};
