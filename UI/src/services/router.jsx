import { createBrowserRouter } from 'react-router-dom'
import { Login } from '../pages/login';
import { Dashboard } from '../pages/dashboard';
import { ProtectedRoutes } from '../components/ProtectedRoutes/ProtectedRoutes';
import { ProtectedLayout } from '../components/ProtectedLayout/ProtectedLayout';
import { Signup } from '../pages/signup';
import { UnprotectedLayout } from '../components/UnprotectedLayout/UnprotectedLayout';


const unprotectedRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  }
]

const protectedRoutes = [
  {
    path: "/",
    element: <Dashboard />
  }
]

const wrappedUnprotectedRoutes = unprotectedRoutes.map(route => ({
  ...route,
  element: <UnprotectedLayout>
    {route.element}
  </UnprotectedLayout>
}))

const wrappedProtectedRoutes = protectedRoutes.map((route) => ({
  ...route,
  element: <ProtectedRoutes>
    <ProtectedLayout>
      {route.element}
    </ProtectedLayout>
  </ProtectedRoutes>,
}));

export const router = createBrowserRouter([...wrappedUnprotectedRoutes, ...wrappedProtectedRoutes]);