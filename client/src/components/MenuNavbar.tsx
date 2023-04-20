// import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { useMobileMenuStore } from "../store/MobileMenuStore";

import TabletSubLink from "./TabletSubLink";

import { Router, useLocation } from "react-router-dom";
import logoMenu from "../assets/wwl-black.png";

function MenuNavbar() {
  const [currentPage, setCurrentPage] = useState("");
  const openMobileMenu = useMobileMenuStore((state) => state.openMobileMenu);

  const location = useLocation();

  useEffect(() => {
    setCurrentPage(location.pathname);
  });

  return (
    <nav className="flex justify-between items-center md:hidden">
      <div className="w-28  relative rounded-md overflow-hidden">
        <img
          src="/media/img/photos/logo_normal.png"
          className="w-full  object-contain"
        />
      </div>

      <div className="md:hidden" onClick={openMobileMenu}>
        <HiMenuAlt2 className="text-4xl" />
      </div>
    </nav>
  );
}

export default MenuNavbar;
