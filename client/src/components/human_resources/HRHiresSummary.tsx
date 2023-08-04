import React from "react";
import { BsArrowUp } from "react-icons/bs";
import HiresTimeTypeChart from "./charts/HiresTimeTypeChart";

function HRHiresSummary() {
  return (
    <div className="grid grid-cols-2 gap-x-4 w-full">
      <div className="flex justify-start sm:justify-center ">
        <div className="flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-4">
            <div className="flex items-end gap-x-8">
              <div className="flex items-center gap-x-2">
                <span className="text-xl font-semibold">Hires</span>
                <span>
                  <BsArrowUp className="text-[#666]" />
                </span>
              </div>

              <span className="text-3xl font-semibold">3</span>
            </div>

            <div className="flex items-center gap-x-1">
              <div className="px-4 py-[2px] bg-active-normal bg-opacity-20 rounded-full">
                <span className="font-semibold text-sm">+2.5%</span>
              </div>
              <span className="text-sm text-[#999]">*</span>
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <span className="font-semibold text-sm">Contract type</span>

            <div className="flex flex-col gap-y-1">
              <div className="flex items-center gap-x-2">
                <div className="w-4 h-4 bg-[#d9d926] rounded-full" />
                <span className="font-medium text-sm">Full Time</span>
                <span className="font-bold text-sm">(80%)</span>
              </div>

              <div className="flex items-center gap-x-2">
                <div className="w-4 h-4 bg-[#26bbd9] rounded-full" />
                <span className="font-medium text-sm">Part Time</span>
                <span className="font-bold text-sm">(20%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[200px] max-h-52">
        <HiresTimeTypeChart />
      </div>
    </div>
  );
}

export default HRHiresSummary;
