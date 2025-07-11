import React from "react";
import { Outlet } from "react-router";
import Header from "../components/header/Header";
import MainFooter from "../pages/mainFooter/MainFooter";

const MainLayout = () => {
  return (
    <>
      <header>
        <Header></Header>
      </header>
      <main className="min-h-[calc(100vh-400px)]">
        <Outlet></Outlet>
      </main>
      <footer>
        <MainFooter></MainFooter>
      </footer>
    </>
  );
};

export default MainLayout;
