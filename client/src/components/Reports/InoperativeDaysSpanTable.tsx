import React from "react";
import { useLocation } from "react-router-dom";

import { useReportInfoTablesDaysSpanStore } from "../../store/ReportInfoTablesDaysSpanStore";

function InoperativeDaysSpanTable() {


  const daysSpan = useReportInfoTablesDaysSpanStore((state)=>state.daysSpan)
  const changeDaysSpan = useReportInfoTablesDaysSpanStore((state)=>state.changeDaysSpan)


  return (
    <div className="flex items-center gap-x-4 lg:self-end">
      <span className="text-sm md:text-base font-semibold">Days span: </span>

      <div>
        <input
          type="number"
          max={1000}
          min={1}
          value={daysSpan}
          onChange={(e) => {
            changeDaysSpan(Number(e.target.value))
            
          }}
          className="px-2 md:px-3 py-1 text-sm md:text-base rounded-[8px] bg-all-normal text-white font-bold w-24  focus:bg-orange-800 focus:outline-none transition-all"
        />
      </div>
    </div>
  );
}

export default InoperativeDaysSpanTable;
