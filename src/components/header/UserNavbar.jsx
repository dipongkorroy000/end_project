import React, { useEffect, useState } from "react";
import { FaAffiliatetheme } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const UserNavbar = ({ user }) => {
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to 'dark'
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "light";
  });

  useEffect(() => {
    const currentTheme = theme ? "light" : "dark";
    document.querySelector("html").setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", currentTheme);
  }, [theme]);

  const handleTheme = () => {
    setTheme(!theme);
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md ${isActive ? "bg-primary text-white" : "hover:bg-base-200"}`
          }
        >
          Dashboard
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/availableCoin"
          end
          className={({ isActive }) =>
            `px-4 py-2 rounded-md ${isActive ? "bg-primary text-white" : "hover:bg-base-200"}`
          }
        >
          Available Coin
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md ${isActive ? "bg-primary text-white" : "hover:bg-base-200"}`
          }
        >
          Profile
        </NavLink>
      </li>

      <li>
        <a
          href="https://github.com/dipongkorroy000"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-md hover:bg-base-200"
        >
          Join as Developer
        </a>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          TaskNest
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end gap-5 items-center">
        <div
          className={`tooltip tooltip-bottom mr-3 mt-2 ${
            theme ? "before:bg-gray-800 before:text-white" : "before:bg-gray-100 before:text-black"
          }`}
          data-tip={theme ? "Switch to Dark Theme" : "Switch to Light Theme"}
        >
          <button>
            <FaAffiliatetheme onClick={handleTheme} className="cursor-pointer" size={22} />
          </button>
        </div>

        {user?.photoURL ? (
          <img className="w-10 h-10 rounded-full" alt="Profile Picture" src={user?.photoURL} />
        ) : (
          <img
            className="w-10 h-10 rounded-full"
            alt="Profile Picture"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6KK6VjSXL_KiLy8TgTSDm2oLwtFwMiZK-wg&s"
          />
        )}
      </div>
    </div>
  );
};

export default UserNavbar;
