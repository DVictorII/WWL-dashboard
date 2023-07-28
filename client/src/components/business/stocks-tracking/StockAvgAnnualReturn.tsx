import React from "react";

function StockAvgAnnualReturn() {
  return (
    <div className="flex flex-col gap-y-6">
      <h2 className="font-semibold">Average Annual Return</h2>

      <div className="flex flex-col gap-y-8">
        <div className="grid grid-cols-3">
          <span className="border-r-2 py-3 text-[#777] px-2 flex justify-center text-center font-semibold text-sm  border-b-2 border-[#f1f1f1]">
            {" "}
            &nbsp;
          </span>
          <span className="col-span-2 flex justify-center items-center font-bold text-sm border-b-2 border-[#f1f1f1]">
            % Total Return
          </span>

          <span className="border-r-2 py-3 text-[#777] px-2 flex justify-center text-center font-semibold text-sm  border-[#f1f1f1]">
            1Y
          </span>
          <span className="col-span-2 flex justify-center items-center font-semibold text-sm">
            15.47%
          </span>

          <span className="border-r-2 py-3 text-[#777] px-2 flex justify-center text-center font-semibold text-sm  border-[#f1f1f1]">
            3Y
          </span>
          <span className="col-span-2 flex justify-center items-center font-semibold text-sm">
            29.34%
          </span>

          <span className="border-r-2 py-3 text-[#777] px-2 flex justify-center text-center font-semibold text-sm  border-[#f1f1f1]">
            5Y
          </span>
          <span className="col-span-2 flex justify-center items-center font-semibold text-sm">
            13.65%
          </span>

          <span className="border-r-2 py-3 text-[#777] px-2 flex justify-center text-center font-semibold text-sm  border-[#f1f1f1]">
            10Y
          </span>
          <span className="col-span-2 flex justify-center items-center font-semibold text-sm">
            -1.57%
          </span>

          <span className="border-r-2 py-3 text-[#777] px-2 flex justify-center text-center font-semibold text-sm  border-[#f1f1f1]">
            Since Nov 4, 2010
          </span>
          <span className="col-span-2 flex justify-center items-center font-semibold text-sm">
            -9.50%
          </span>
        </div>

        <span className="text-xs text-[#999] font-semibold">
          As of June, 2023
        </span>
      </div>
    </div>
  );
}

export default StockAvgAnnualReturn;
