import { useState } from "react";
import { useLocation } from "react-router-dom";

// @ts-ignore: Unreachable code error
import { boxShadow } from "../utils/shadow";

import TabletLink from "./TabletLink";

function TabletSidebar() {
  const [popUpIsOpen, setPopUpIsOpen] = useState(false);

  const openAccountPopUp = () => setPopUpIsOpen(true);
  const closeAccountPopUp = () => setPopUpIsOpen(false);

  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <div
      className="w-14 bg-orangeSecondary bg-opacity-90 fixed top-20 left-6 hidden md:flex lg:hidden flex-col items-center py-10 gap-y-10 rounded-full z-50"
      style={{
        boxShadow,
      }}
    >
      <TabletLink
        icon="dashboard"
        linkTo="/"
        isCurrentPage={currentPage === "/"}
      />
      <TabletLink
        icon="chart"
        linkTo="/paddock-lectures"
        isCurrentPage={currentPage === "/paddock-lectures"}
      />

      <TabletLink
        icon="reports"
        linkTo="/reports/incidents"
        isCurrentPage={
          currentPage.startsWith("/reports") ||
          currentPage.startsWith("/biannual-visits")
        }
      />

      <TabletLink
        icon="account"
        isCurrentPage={false}
        hasAccountPopUp
        isOpen={popUpIsOpen}
        closeAccountPopUp={closeAccountPopUp}
        openAccountPopUp={openAccountPopUp}
      />
    </div>
  );
}

export default TabletSidebar;
