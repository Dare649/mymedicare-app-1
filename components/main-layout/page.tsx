"use client";

import React, { ReactNode } from "react";
import Topbar from "@/components/topbar/page";
import Sidebar from "@/components/sideBar/page";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar - fixed to the left */}
      <aside className="hidden lg:flex lg:w-[20%] fixed top-0 left-0 h-full bg-white z-40 shadow-md">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-[20%] w-full flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Main Content */}
        <main className="flex-1 lg:mt-26 sm:mt-20 lg:p-5 sm:p-5">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
