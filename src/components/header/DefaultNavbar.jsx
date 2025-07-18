import React, { useEffect, useState } from "react";
import { LiaAffiliatetheme } from "react-icons/lia";
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
        className={`tooltip tooltip-bottom mr-3 mt-2 ${
          theme === false ? "before:bg-gray-100 before:text-black" : "before:bg-gray-800 before:text-white"
        }`}
        data-tip={theme === false ? "Switch to Light Theme" : "Switch to Dark Theme"}
      >
        <button>
          <LiaAffiliatetheme onClick={handleTheme} className="cursor-pointer" size={18} />
        </button>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal max-md:text-sm px-1">
          <li>
            <Link className="link-color underline" to="/signIn">
              SignIn
            </Link>
          </li>
          <li className="max-md:hidden">
            <Link className="link-color underline" to="/signUp">
              SignUp
            </Link>
          </li>
        </ul>
        <Link className="btn bg-primary max-md:px-1 max-md:text-sm max-md:py-0.5" to={"https://github.com/dipongkorroy000"} >Join as Developer</Link>
      </div>
    </nav>
  );
};

export default DefaultNavbar;
