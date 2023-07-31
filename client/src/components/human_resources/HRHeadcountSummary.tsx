import React from "react";
import { IoMan, IoWoman } from "react-icons/io5";

function HRHeadcountSummary() {
  return (
    <div className="w-full flex flex-col gap-y-6">
      <div className="flex items-center gap-x-8">
        <span className="text-lg font-semibold">Headcount</span>
        <span className="text-2xl font-semibold">25</span>
      </div>

      <div className="w-full flex flex-col gap-y-4">
        <div className="grid grid-cols-2 gap-x-4 justify-items-center pb-2 border-b">
          <div className="flex items-center gap-x-3">
            <IoMan className="w-6 h-6" />
            <div className="flex flex-col  items-center">
              <span className="font-bold text-lg">64.7%</span>
              <span className="text-sm font-semibold">Male</span>
            </div>
          </div>

          <div className="flex items-center gap-x-3">
            <IoWoman className="w-6 h-6" />
            <div className="flex flex-col  items-center">
              <span className="font-bold text-lg">35.3%</span>
              <span className="text-sm font-semibold">Female</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 justify-items-center relative">
          <div className="flex flex-col px-2 gap-y-2">
            <span className="text-center text-sm font-semibold">
              Avg. Employee tenure
            </span>
            <span className="text-center text-lg font-semibold">4.6 years</span>
          </div>

          <div className="flex flex-col px-2 gap-y-2">
            <span className="text-center text-sm font-semibold">
              Avg. Team members experience
            </span>
            <span className="text-center text-lg font-semibold">2 years</span>
          </div>

          <div className="absolute top-0 left-1/2 w-px h-full bg-[#ccc]" />
        </div>
      </div>
    </div>
  );
}

export default HRHeadcountSummary;
