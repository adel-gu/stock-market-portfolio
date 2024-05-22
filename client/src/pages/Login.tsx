import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useLoginUser } from '../api/auth.api';

export type LoginInputsType = {
  email: string;
  password: string;
};

const Login = () => {
  const { isPending, loginUser } = useLoginUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputsType>();

  const onSubmit: SubmitHandler<LoginInputsType> = (data) => {
    loginUser(data);
  };

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Login to your account
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center items-center"
      >
        <div className="space-y-8 w-1/3">
          <label className="flex flex-col items-start gap-2">
            Email
            <input
              className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              {...register('email', { required: 'Email field is required' })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </label>
          <label className="flex flex-col items-start gap-2">
            Password
            <input
              className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              {...register('password', {
                required: 'Password field is required',
                minLength: {
                  value: 8,
                  message: 'Password must be 8 character or more',
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </label>
          <div className="flex flex-col items-center gap-5">
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
              disabled={isPending}
            >
              Login
            </button>
            <span className="text-sm">
              Don't have an account?{' '}
              <Link
                to="/auth/sign-up"
                className="text-blue-600 hover:text-blue-500 underline"
              >
                Register here
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
