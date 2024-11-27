import { createBrowserRouter } from 'react-router-dom'
import { Login } from '../pages/login';
import { Dashboard } from '../pages/dashboard';
import { ProtectedRoutes } from '../components/ProtectedRoutes/ProtectedRoutes';
import { ProtectedLayout } from '../components/ProtectedLayout/ProtectedLayout';
import { Signup } from '../pages/signup';
import { UnprotectedLayout } from '../components/UnprotectedLayout/UnprotectedLayout';
import { DatePersonale } from '../pages/datePersonale';
import { JurnalMedical } from '../pages/jurnalMedical';


export const unprotectedRoutes = [
  {
    path: "/",
    name: "Login",
    element: <Login />,
  },
  {
    path: "/signup",
    name: "Inregistrare",
    element: <Signup />,
  }
]

export const protectedRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    element: <Dashboard />
  },
  {
    path: "/date-personale",
    name: "Date Personale",
    element: <DatePersonale />
  },
  {
    path: "/jurnal-medical",
    name: "Jurnal medical",
    element: <JurnalMedical />
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