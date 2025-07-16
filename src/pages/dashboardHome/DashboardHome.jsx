import React from "react";
import useUserRole from "../../hooks/useUserRole";
import AdminHome from "./adminHome/AdminHome";
import BuyerHome from "./buyerHome/BuyerHome";
import WorkerHome from "./workerHome/WorkerHome";
import PageSpinner from "../../components/Spinner/PageSpinner";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <PageSpinner></PageSpinner>;
  }

  if (role === "admin") {
    return <AdminHome></AdminHome>;
  }

  if (role === "buyer") {
    return <BuyerHome></BuyerHome>;
  }

  if (role === "worker") {
    return <WorkerHome></WorkerHome>;
  }
};

export default DashboardHome;
