import React from "react";
import { IoMan, IoWoman } from "react-icons/io5";

function HRHeadcountSummary() {
  return (
    <div className="w-full flex flex-col gap-y-6">
      <div className="flex items-end gap-x-8">
        <span className="text-xl font-semibold">Headcount</span>
        <span className="text-3xl font-semibold">25</span>
      </div>

      <div className="w-full grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-2  relative">
        <div className="flex justify-center items-center py-4">
          <div className="flex items-center gap-x-3">
            <IoMan className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            <div className="flex flex-col  items-center">
              <span className="font-bold text-lg">64.7%</span>
              <span className="text-sm font-semibold">Male</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center py-4 md:border-r  2xl:border-r-0 border-[#ccc]">
          <div className="flex items-center gap-x-3">
            <IoWoman className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            <div className="flex flex-col  items-center">
              <span className="font-bold text-lg">35.3%</span>
              <span className="text-sm font-semibold">Female</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center py-4 px-4 border-t md:border-t-0 2xl:border-t  border-r border-[#ccc]">
          <div className="flex flex-col  gap-y-2 ">
            <span className="text-center text-sm font-semibold">
              Avg. Employee tenure
            </span>
            <span className="text-center text-lg font-semibold">4.6 years</span>
          </div>
        </div>

        <div className="flex justify-center items-center py-4 px-4 border-t md:border-t-0 2xl:border-t border-[#ccc]">
          <div className="flex flex-col  gap-y-2  ">
            <span className="text-center text-sm font-semibold">
              Avg. Team members experience
            </span>
            <span className="text-center text-lg font-semibold">2 years</span>
          </div>
        </div>

        {/* <div className="absolute top-1/2 md:top-0 2xl:top-1/2 left-1/2 w-px h-1/2 md:h-full 2xl:h-1/2 bg-[#ccc]" />
        <div className="absolute top-0  left-3/4 w-px h-full  bg-[#ccc] hidden md:block 2xl:hidden" /> */}
      </div>
    </div>
  );
}

export default HRHeadcountSummary;
