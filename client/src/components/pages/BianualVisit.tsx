import React from "react";

import { useLocation } from "react-router-dom";

import MenuNavbar from "../MenuNavbar";

import { BsPlusSquare } from "react-icons/bs";
import BVisitSelector from "../BVisits/BVisitSelector";
import BVisitMapShowcase from "../BVisits/BVisitMapShowcase";
import BVisitMediaPlayer from "../BVisits/BVisitMediaPlayer";

function BianualVisit() {
  const location = useLocation();

  return (
    <>
      <MenuNavbar />

      <div className="mt-12 md:mt-0 flex flex-col gap-y-8 justify-between">
        <h1 className="font-bold ">Operations - Biannual Visits</h1>

        <div className="flex flex-col gap-y-4">
          <h2 className=" font-bold ">
            Biannual Review - 360 Photos - May 2022
          </h2>
          <p className="text-sm font-medium text-[#555]">Made on 2022-05-02</p>
        </div>
      </div>

      <div className="bg-backgroundWhite md:bg-white   md:px-8 md:py-10  rounded-2xl mt-12 flex flex-col gap-y-12 md:gap-y-8 md:shadow-lg ">
        <div className="flex items-center justify-between gap-x-16 flex-wrap gap-y-8">
          <BVisitSelector />

          {/* <button className="flex items-center gap-x-2 px-3 xl:px-4 py-2 bg-all-normal text-white rounded-[8px] hover:bg-orange-800 transition-all">
            <BsPlusSquare className="w-3 h-3 xl:w-4 xl:h-4 opacity-70" />
            <span className="text-xs xl:text-sm font-bold">
              Register new visit
            </span>
          </button> */}
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-x-8 2xl:gap-x-12">
          <BVisitMapShowcase />

          <BVisitMediaPlayer />
        </div>
      </div>
    </>
  );
}

export default BianualVisit;
