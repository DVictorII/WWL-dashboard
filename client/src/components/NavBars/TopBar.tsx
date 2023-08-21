import React from "react";
import GlobalSearchBar from "./GlobalSearchBar";
import AlertsButton from "./AlertsButton";
import TopBarProfileComp from "./TopBarProfileComp";

function TopBar() {
  return (
    <div className="sticky top-0 left-[16.67%]  p-4 w-full  bg-[#333] text-white z-[400] border-l border-[#ccc] hidden lg:flex justify-end ">
      <div className="flex items-center gap-x-6">
        <GlobalSearchBar />
        <AlertsButton />
        <TopBarProfileComp />
      </div>
    </div>
  );
}

export default TopBar;
