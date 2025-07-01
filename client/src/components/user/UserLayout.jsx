import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const UserLayout = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      <Header />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
