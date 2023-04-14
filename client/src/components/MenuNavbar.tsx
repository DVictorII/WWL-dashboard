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
    <nav className="flex justify-between items-center lg:hidden">
      <div className="w-36  relative rounded-md overflow-hidden">
        <img
          src="/static/img/rossing_logo.png"
          className="w-full  object-contain"
        />
      </div>

      <div className="md:hidden" onClick={openMobileMenu}>
        <HiMenuAlt2 className="text-4xl" />
      </div>

      {currentPage.startsWith("/reports") ||
      currentPage.startsWith("/biannual-visits") ? (
        <div className="hidden md:grid grid-cols-2 lg:hidden items-center gap-x-12 gap-y-8">
          <TabletSubLink
            title="Piezometers"
            linkTo="/reports/piezometers"
            isCurrentPage={currentPage.startsWith("/reports/piezometers")}
          />
          <TabletSubLink
            title="Incidents"
            linkTo="/reports/incidents"
            isCurrentPage={currentPage.startsWith("/reports/incidents")}
          />
          <TabletSubLink
            title="Visits"
            linkTo="/biannual-visits"
            isCurrentPage={currentPage.startsWith("/biannual-visits")}
          />
        </div>
      ) : null}
    </nav>
  );
}

export default MenuNavbar;
