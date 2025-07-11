import React from "react";
import { Link, Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <>
      <Link to="/" className="btn btn-ghost text-xl">
        daisyUI
      </Link>
      <Outlet></Outlet>
    </>
  );
};

export default AuthLayout;
