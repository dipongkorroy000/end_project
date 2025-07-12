import { createBrowserRouter } from "react-router";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../components/header/authentication/SignIn";
import SignUp from "../components/header/authentication/SignUp";
import Profile from "../pages/profile/Profile";
import PrivateRoutes from "../routes/PrivateRoutes";
import ComponentSpinner from "../components/Spinner/ComponentSpinner";
import ProfileUpdate from "../pages/profile/ProfileUpdate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/profile",
        element: (
          <PrivateRoutes>
            <Profile></Profile>
          </PrivateRoutes>
        ),
      },
      {
        path: "/profileUpdate",
        element: (
          <PrivateRoutes>
            <ProfileUpdate></ProfileUpdate>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    hydrateFallback: ComponentSpinner,
    children: [
      {
        path: "/signIn",
        Component: SignIn,
      },
      {
        path: "/signUp",
        Component: SignUp,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>
    ),
    children: [],
  },
]);

export default router;
