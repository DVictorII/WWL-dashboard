import React from "react";
import MenuNavbar from "../../MenuNavbar";
import HRHeadcountSummary from "../../human_resources/HRHeadcountSummary";
import HRHiresSummary from "../../human_resources/HRHiresSummary";
import HRLeavesSummary from "../../human_resources/HRLeavesSummary";

function Team_information() {
  return (
    <>
      <MenuNavbar />

      <div className="mt-12 md:hidden" />

      <div className="flex items-center justify-between gap-x-8 gap-y-6 flex-wrap bg-white  p-4 rounded-xl shadow-md shadow-[rgba(91,71,0,0.1)]   ">
        <h1 className="font-bold xl:text-lg ">
          <span className="text-[#b69000]">Staff Training</span> - Team
          Information
        </h1>
      </div>

      <div className="mt-6" />

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 lg:gap-x-6  gap-y-6 ">
        <div className="flex  justify-between gap-x-8 gap-y-6 flex-wrap bg-white  p-4 rounded-xl shadow-md shadow-[rgba(91,71,0,0.1)]   ">
          <HRHeadcountSummary />
        </div>

        <div className="flex  justify-between gap-x-8 gap-y-6 flex-wrap bg-white  p-4 rounded-xl shadow-md shadow-[rgba(91,71,0,0.1)]   ">
          <HRHiresSummary />
        </div>

        <div className="flex  justify-between gap-x-8 gap-y-6 flex-wrap bg-white  p-4 rounded-xl shadow-md shadow-[rgba(91,71,0,0.1)]   ">
          <HRLeavesSummary />
        </div>
      </div>
    </>
  );
}

export default Team_information;
