import React from "react";
import DashboardHeader from "../components/dashboardHeader/DashboardHeader";
import Footer from "../pages/dashboard/footer/Footer";
import { Link, Outlet } from "react-router";
import { FiHome, FiLogOut, FiPackage, FiSettings } from "react-icons/fi";

const DashboardLayout = () => {
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
                <FiLogOut className="text-lg text-color" /> Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="drawer-content flex flex-col">
          {/* Top Navbar */}
          <div className="navbar bg-base-100 px-4 shadow-md">
            <div className="flex-1">
              <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
                ☰
              </label>
              <span className="font-bold text-xl">Dashboard</span>
            </div>
          </div>

          {/* Page Content */}
          <div className="min-h-[calc(100vh-284px)] p-6">
            <Outlet></Outlet>
          </div>

          <div className="navbar bg-base-100 shadow-md">
            <Footer></Footer>
            {/* <div className="flex-1">
              <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
                ☰
              </label>
              <span className="font-bold text-xl">Dashboard</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
