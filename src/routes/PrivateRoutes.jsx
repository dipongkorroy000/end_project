import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/Spinner/LoadingSpinner";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (!user) {
    return <Navigate state={{ from: location.pathname }} to="/signIn" replace />;
  }

  return children;
};

export default PrivateRoutes;
