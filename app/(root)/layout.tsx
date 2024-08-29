import Footer from "@/components/shared/Footer";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Navbar from "@/components/shared/navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="mainContainer flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 dark:bg-slate-900 max-md:pb-14 sm:px-14">
          <div className="z-10 mx-auto w-full max-w-5xl">
            {children}
          </div>
        </section>
        <RightSidebar />
      </div>
      <Footer/>
      <Toaster />
    </main>
  );
};

export default Layout;
