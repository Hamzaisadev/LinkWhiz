import Header from "@/components/header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen mx-30">
        <Header />
        <Outlet />
      </main>

      <div className="p-2 text-center text-amber-100 bg-amber-950 mt-10">
        Made with love by hamza
      </div>
    </div>
  );
};

export default AppLayout;
