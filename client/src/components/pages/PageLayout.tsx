import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useLogOutStore } from "../../store/LogOutStore";

import Sidebar from "../NavBars/Sidebar";
import { motion } from "framer-motion";
import LogOutConfirmationModal from "../LogOutConfirmationModal";
import MobileMenu from "../MobileMenu";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "../ProtectedRoute";
import ProtectedLogIn from "../ProtectedLogIn";

function PageLayout() {
  const location = useLocation();

  const logOutModalIsOpen = useLogOutStore((state) => state.logOutModalIsOpen);

  return location.pathname === "/login" ? (
    // <ProtectedLogIn>
    <div>
      <Outlet />
    </div>
  ) : (
    // </ProtectedLogIn>
    // <ProtectedRoute>
    <main className="flex font-openSans">
      <Sidebar />

      {/* <div className="hidden md:block w-20 shrink-0 md:w-24 2xl:w-28 h-screen" /> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        key={location.pathname}
        className="text-[#333] px-2 sm:px-8 py-8 md:px-8  lg:p-12  2xl:p-16  bg-[#f5f5f5] grow  "
      >
        <MobileMenu />

        <Outlet />
      </motion.div>

      {logOutModalIsOpen ? <LogOutConfirmationModal /> : null}

      <Toaster position="top-right" />
    </main>
    // </ProtectedRoute>
  );
}

export default PageLayout;
