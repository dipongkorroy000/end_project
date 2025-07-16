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
import Home from "../pages/home/Home";
import AddNewTask from "../pages/buyer/addNewTask/AddNewTask";
import MyTasks from "../pages/buyer/myTasks/MyTasks";
import PaymentHistory from "../pages/buyer/paymentHistory/PaymentHistory";
import PurchaseCoin from "../pages/buyer/purchaseCoin/PurchaseCoin";
import DashboardHome from "../pages/dashboardHome/DashboardHome";
import ManageTask from "../pages/admin/manageTask/ManageTask";
import ManageUsers from "../pages/admin/manageUsers/ManageUsers";
import TaskList from "../pages/worker/taskList/TaskList";
import MySubmissions from "../pages/worker/mySubmissions/MySubmissions";
import Withdrawals from "../pages/worker/withDrawals/Withdrawals";
import Forbidden from "../pages/forbidden/Forbidden";
import BuyerRoutes from "../routes/BuyerRoutes";
import WorkerRoutes from "../routes/WorkerRoutes";
import AdminRoutes from "../routes/AdminRoutes";
import Payment from "../pages/payment/Payment";
import TaskDetails from "../pages/worker/taskList/TaskDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        Component: Home,
      },
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
      {
        path: "/forbidden",
        Component: Forbidden,
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
    children: [
      {
        index: true,
        element: (
          <PrivateRoutes>
            <DashboardHome></DashboardHome>
          </PrivateRoutes>
        ),
      },
      {
        path: "payment/:taskId",
        element: <Payment></Payment>,
      },

      // admin
      {
        path: "manageTask",
        element: (
          <PrivateRoutes>
            <AdminRoutes>
              <ManageTask></ManageTask>
            </AdminRoutes>
          </PrivateRoutes>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <PrivateRoutes>
            <AdminRoutes>
              <ManageUsers></ManageUsers>
            </AdminRoutes>
          </PrivateRoutes>
        ),
      },

      // buyer
      {
        path: "addNewTask",
        // path: "addNewTask/:email",
        // loader: ({ params }) => fetch(`/userFind?email=${params?.email}`),
        element: (
          <PrivateRoutes>
            <BuyerRoutes>
              <AddNewTask></AddNewTask>
            </BuyerRoutes>
          </PrivateRoutes>
        ),
      },
      {
        path: "myTasks",
        element: (
          <PrivateRoutes>
            <BuyerRoutes>
              <MyTasks></MyTasks>
            </BuyerRoutes>
          </PrivateRoutes>
        ),
      },
      {
        path: "paymentHistory",
        element: (
          <PrivateRoutes>
            <BuyerRoutes>
              <PaymentHistory></PaymentHistory>
            </BuyerRoutes>
          </PrivateRoutes>
        ),
      },
      {
        path: "purchaseCoin",
        element: (
          <PrivateRoutes>
            <BuyerRoutes>
              <PurchaseCoin></PurchaseCoin>
            </BuyerRoutes>
          </PrivateRoutes>
        ),
      },

      // worker

      {
        path: "taskList",
        element: (
          <PrivateRoutes>
            <WorkerRoutes>
              <TaskList></TaskList>
            </WorkerRoutes>
          </PrivateRoutes>
        ),
      },
      {
        path: "taskDetails/:id",
        element: (
          <PrivateRoutes>
            <WorkerRoutes>
              <TaskDetails></TaskDetails>
            </WorkerRoutes>
          </PrivateRoutes>
        ),
      },

      {
        path: "mySubmissions",
        element: (
          <PrivateRoutes>
            <WorkerRoutes>
              <MySubmissions></MySubmissions>
            </WorkerRoutes>
          </PrivateRoutes>
        ),
      },
      {
        path: "withdrawals",
        element: (
          <PrivateRoutes>
            <WorkerRoutes>
              <Withdrawals></Withdrawals>
            </WorkerRoutes>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default router;
