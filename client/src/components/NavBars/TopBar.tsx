import React from "react";
import GlobalSearchBar from "./GlobalSearchBar";
import AlertsButton from "./AlertsButton";
import TopBarProfileComp from "./TopBarProfileComp";

function TopBar() {
  return (
    <div className="p-4 w-full  bg-[#333] text-white z-[400] border-l border-[#ccc] hidden lg:flex justify-end h-min">
      <div className="flex items-center gap-x-6">
        <GlobalSearchBar />
        <AlertsButton />
        <TopBarProfileComp />
      </div>
    </div>
  );
}

export default TopBar;
