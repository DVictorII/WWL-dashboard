import React from "react";
import { BsArrowUp } from "react-icons/bs";
import HiresTimeTypeChart from "./charts/HiresTimeTypeChart";

function HRHiresSummary() {
  return (
    <div className="grid grid-cols-2 gap-x-4">
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-8">
          <div className="flex items-center gap-x-2">
            <span className="text-lg font-semibold">Hires</span>
            <span>
              <BsArrowUp />
            </span>
          </div>

          <span className="text-2xl font-semibold">3</span>
        </div>

        <div className="flex items-center gap-x-1">
          <div className="px-4 py-[2px] bg-active-normal bg-opacity-20 rounded-full">
            <span className="font-semibold text-sm">+2.5%</span>
          </div>
          <span className="text-sm">*</span>
        </div>
      </div>
      <div>
        <HiresTimeTypeChart />
      </div>
    </div>
  );
}

export default HRHiresSummary;
