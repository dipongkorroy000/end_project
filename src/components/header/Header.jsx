import React from "react";
import DefaultNavbar from "./DefaultNavbar";
import UserNavbar from "./UserNavbar";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Spinner/LoadingSpinner";

const Header = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (user) {
    return <UserNavbar user={user}></UserNavbar>;
  } else {
    return <DefaultNavbar></DefaultNavbar>;
  }
};

export default Header;
