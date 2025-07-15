import React, { useEffect, useState } from "react";
import { FaAffiliatetheme } from "react-icons/fa";
import { Link } from "react-router";

const DefaultNavbar = () => {
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

  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          TaskNest
        </Link>
      </div>

      <div
        className={`tooltip tooltip-bottom mr-3 ${
          theme === false ? "before:bg-gray-100 before:text-black" : "before:bg-gray-800 before:text-white"
        }`}
        data-tip={theme === false ? "Switch to Light Theme" : "Switch to Dark Theme"}
      >
        <button>
          <FaAffiliatetheme onClick={handleTheme} className="cursor-pointer" size={20} />
        </button>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link className="link-color underline" to="/signIn">
              SignIn
            </Link>
          </li>
          <li>
            <Link className="link-color underline" to="/signUp">
              SignUp
            </Link>
          </li>
        </ul>
        <Link className="btn bg-primary" to={"https://github.com/dipongkorroy000"} >Join as Developer</Link>
      </div>
    </nav>
  );
};

export default DefaultNavbar;
