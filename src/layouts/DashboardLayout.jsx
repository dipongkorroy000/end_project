import React from "react";
import DashboardHeader from "../components/dashboardHeader/DashboardHeader";
import Footer from "../pages/dashboard/footer/Footer";
import { Link, Outlet, useNavigate } from "react-router";
import { FiHome, FiLogOut, FiPackage, FiSettings } from "react-icons/fi";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import PageSpinner from "../components/Spinner/PageSpinner";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const axiosUse = useAxios();
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
            <h2 className="">
              <Link to="/" className="btn btn-ghost text-xl font-bold mb-4">
                📦daisyUI
              </Link>
            </h2>
            <li>
              <Link to="/dashboard">
                <FiHome className="text-lg text-color" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/parcels">
                <FiPackage className="text-lg text-color" /> Parcels
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <FiSettings className="text-lg text-color" />
                Settings
              </Link>
            </li>
            <li>
              <button>
                <FiLogOut className="text-lg text-color" /> <span onClick={handleLogout}>Logout</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="drawer-content flex flex-col">
          {/* Top Navbar */}
          <div className="navbar bg-base-100 px-4 shadow-md">
            <div className="flex-1">
              <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden ">
                ☰
              </label>
              <span className="font-bold text-xl">Dashboard</span>
            </div>

            <div className="flex flex-col items-end space-y-1 px-12 shadow-2xl">
              <div className="flex items-center space-x-2 justify-center">
                <h2 className="text-2xl">{data?.coin || 0}</h2>
                <span>|</span>
                <img
                  src={user?.photoURL || "https://laser360clinic.com/wp-content/uploads/2020/08/user-image.jpg"}
                  className="w-7 content-center h-7 rounded-2xl"
                  alt="profile pic"
                />
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
