import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";

const UserLayout: React.FC = () => {
  return (
    <div className="h-screen  w-full flex ">
      <Sidebar />
      <div className=" p-6 md:p-12 w-full h-full relative">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
