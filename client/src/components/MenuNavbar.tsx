// import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { useMobileMenuStore } from "../store/MobileMenuStore";

import { useLocation } from "react-router-dom";

function MenuNavbar() {
  const [currentPage, setCurrentPage] = useState("");
  const openMobileMenu = useMobileMenuStore((state) => state.openMobileMenu);

  const location = useLocation();

  useEffect(() => {
    setCurrentPage(location.pathname);
  });

  return (
    <nav className="flex justify-between items-center md:hidden">
      <div className="w-24  relative ">
        <img
          src="/media/img/photos/logo_normal.png"
          className="w-full  object-contain"
        />
      </div>

      <div className="md:hidden" onClick={openMobileMenu}>
        <HiMenuAlt2 className="text-2xl" />
      </div>
    </nav>
  );
}

export default MenuNavbar;
