import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from './pages/Home';
import AppLayout from './layouts/AppLayout';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import AuthContextProvider from './context/AuthContext';
import AuthLayout from './layouts/AuthLayout';
import WatchList from './pages/WatchList';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'watch-list',
            element: <WatchList />,
          },
        ],
      },
    ],
  },
  {
    path: 'sign-up',
    element: <SignUp />,
  },
  {
    path: 'login',
    element: <Login />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />;
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
