import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useUser, SignIn } from "@clerk/clerk-react";

const Layout = () => {
  const navigate = useNavigate();
  const [sideBar, setSideBar] = useState(false);
  const {user} = useUser();
  return user ? (
    <div className="flex flex-col items-center justify-start h-screen ">
      <nav className="w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200">
        <h1
          onClick={() => {
            navigate("/");
            window.scrollTo(0, 0);
          }}
          className="text-2xl font-semibold text-primary cursor-pointer"
        >
          go.AI
        </h1>
        {sideBar ? (
          <X
            onClick={() => setSideBar(false)}
            className="w-6 h-6 text-gray-600 sm:hidden cursor-pointer"
          />
        ) : (
          <Menu
            onClick={() => setSideBar(true)}
            className="w-6 h-6 text-gray-600 sm:hidden cursor-pointer"
          />
        )}
      </nav>

      <div className="flex-1 w-full flex h-[calc-100vh-64px]">
        <Sidebar sideBar={sideBar} setSideBar={setSideBar} />
        <div className="flex-1 bg-[#f4f7fb]"> 
          <Outlet />
        </div>
      </div>
    </div>
  ): (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  )
};

export default Layout;
