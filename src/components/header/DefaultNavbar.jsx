import React from "react";
import { Link } from "react-router";

const DefaultNavbar = () => {
  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          daisyUI
        </Link>
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
        <button className="btn bg-primary">Join as Developer</button>
      </div>
    </nav>
  );
};

export default DefaultNavbar;
