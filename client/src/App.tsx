import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import AppLayout from './layouts/AppLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
