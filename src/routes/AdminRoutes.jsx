import React from "react";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import PageSpinner from "../components/Spinner/PageSpinner";
import { Navigate } from "react-router";

const AdminRoutes = ({ children }) => {
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return (
      <div className="w-fit mx-auto">
        <PageSpinner></PageSpinner>
      </div>
    );
  }

  if (!user || role !== "admin") {
    return <Navigate to="/forbidden"></Navigate>;
  }

  return children;
};

export default AdminRoutes;
