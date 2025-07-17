import React from "react";
import Footer from "../pages/dashboard/footer/Footer";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiLogOut,
  FiPackage,
  FiSettings,
  FiPlusCircle,
  FiClipboard,
  FiCreditCard,
  FiShoppingCart,
  FiList,
  FiSend,
  FiDollarSign,
} from "react-icons/fi";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import PageSpinner from "../components/Spinner/PageSpinner";
import useAxiosSecure from "../hooks/useAxiosSecure";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const axiosUse = useAxiosSecure();
  const { user, loading: load, logout } = useAuth();

  const { data = {}, loading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosUse(`/userFind?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (loading || load) {
    return <PageSpinner></PageSpinner>;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <div className="drawer lg:drawer-open bg-base-200 min-h-screen">
        {/* Sidebar */}
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-72 min-h-full bg-base-100 text-base-content">
            <h2>
              <Link to="/" className="btn btn-ghost text-xl font-bold mb-4">
                📦TaskNest
              </Link>
            </h2>

            <li>
              <NavLink
                to="/dashboard"
                end // 👈 ensures exact match
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-md ${
                    isActive ? "bg-primary text-white" : "hover:bg-base-200"
                  }`
                }
              >
                <FiHome className="text-lg text-color" /> Home
              </NavLink>
            </li>

            {/* admin */}
            {data.role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/manageTask"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-md ${
                        isActive ? "bg-primary text-white" : "hover:bg-base-200"
                      }`
                    }
                  >
                    <FiPackage className="text-lg text-color" /> ManageTask
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manageUsers"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-md ${
                        isActive ? "bg-primary text-white" : "hover:bg-base-200"
                      }`
                    }
                  >
                    <FiSettings className="text-lg text-color" /> Manage Users
                  </NavLink>
                </li>
              </>
            )}

            {/* buyer */}
            {data.role === "buyer" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/addNewTask"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-md ${
                        isActive ? "bg-primary text-white" : "hover:bg-base-200"
                      }`
                    }
                  >
                    <FiPlusCircle className="text-lg text-color" /> Add Task
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/myTasks"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-md ${
                        isActive ? "bg-primary text-white" : "hover:bg-base-200"
                      }`
                    }
                  >
                    <FiClipboard className="text-lg text-color" /> My Tasks
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/paymentHistory"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-md ${
                        isActive ? "bg-primary text-white" : "hover:bg-base-200"
                      }`
                    }
                  >
                    <FiCreditCard className="text-lg text-color" /> Payment History
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/purchaseCoin"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-md ${
                        isActive ? "bg-primary text-white" : "hover:bg-base-200"
                      }`
                    }
                  >
                    <FiShoppingCart className="text-lg text-color" /> Purchase Coin
                  </NavLink>
                </li>
              </>
            )}

            {/* worker */}
            {data.role === "worker" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/taskList"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-md ${
                        isActive ? "bg-primary text-white" : "hover:bg-base-200"
                      }`
                    }
                  >
                    <FiList className="text-lg text-color" /> Task List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/mySubmissions"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-md ${
                        isActive ? "bg-primary text-white" : "hover:bg-base-200"
                      }`
                    }
                  >
                    <FiSend className="text-lg text-color" /> My Submissions
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/withdrawals"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-md ${
                        isActive ? "bg-primary text-white" : "hover:bg-base-200"
                      }`
                    }
                  >
                    <FiDollarSign className="text-lg text-color" /> Withdrawals
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-base-200"
                  >
                    <FiLogOut className="text-lg text-color" /> Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Main Content */}
        <div className="drawer-content flex flex-col">
          {/* Top Navbar */}
          <div className="navbar bg-base-100 px-4 shadow-sm">
            <div className="flex-1">
              <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden ">
                ☰
              </label>
              <span className="font-bold text-xl">Dashboard</span>
            </div>

            <div className="flex flex-col items-end space-y-1 px-12 shadow-sm py-1">
              <div className="flex items-center space-x-2 justify-center">
                <h2 className="text-2xl">{data?.coin || 0}</h2>
                <span>|</span>

                {user?.photoURL ? (
                  <img src={user?.photoURL} className="w-7 content-center h-7 rounded-2xl" alt="profile pic" />
                ) : (
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6KK6VjSXL_KiLy8TgTSDm2oLwtFwMiZK-wg&s"
                    className="w-7 content-center h-7 rounded-2xl"
                    alt="profile pic"
                  />
                )}
              </div>

              {/* Second row: userRole | userName */}
              <div className="flex space-x-2 justify-end text-gray-500 text-sm">
                <h2>{data?.role || "loading..."}</h2>
                <span>|</span>
                <h2>{user?.displayName || "Loading..."}</h2>
              </div>
            </div>

            {/* notification */}
            <div className="flex-none">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <IoNotificationsCircleOutline size={26} className="cursor-pointer" />
                    <span className="badge badge-sm indicator-item text-white bg-primary">8</span>
                  </div>
                </div>
                <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                  <div className="card-body">
                    <span className="text-lg font-bold">8 Items</span>
                    <span className="text-info">Subtotal: $999</span>
                    <div className="card-actions">
                      <button className="btn btn-primary btn-block">View cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="min-h-[calc(100vh-284px)] p-6">
            <Outlet></Outlet>
          </div>

          <div className="navbar bg-base-100 shadow-md">
            <Footer></Footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
