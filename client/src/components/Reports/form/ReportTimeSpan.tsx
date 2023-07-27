import React from "react";
import { useNewPiezoReportStateStore } from "../../../store/NewPiezoReportStateStore";

function ReportTimeSpan() {
  const timeSpan = useNewPiezoReportStateStore((state) => state.timeSpan);
  const changeTimeSpan = useNewPiezoReportStateStore(
    (state) => state.changeTimeSpan
  );

  return (
    <div className=" flex flex-col gap-y-1  xl:grid xl:grid-cols-3 gap-x-4">
      <span className="text-[10px] xl:text-xs  font-semibold text-[#666] justify-self-end">
        Report time span
      </span>
      <div className=" xl:col-span-2 flex items-start gap-x-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            changeTimeSpan("weekly");
          }}
          style={{
            color: timeSpan === "weekly" ? "#fff" : "#333",
            backgroundColor: timeSpan === "weekly" ? "#333" : "#fff",
          }}
          className={`border border-[#333] px-4 py-1 text-sm font-semibold rounded-full transition-all`}
        >
          Weekly
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            changeTimeSpan("monthly");
          }}
          style={{
            color: timeSpan === "monthly" ? "#fff" : "#333",
            backgroundColor: timeSpan === "monthly" ? "#333" : "#fff",
          }}
          className={`border border-[#333] px-4 py-1 text-sm font-semibold rounded-full transition-all`}
        >
          Monthly
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            changeTimeSpan("quarterly");
          }}
          style={{
            color: timeSpan === "quarterly" ? "#fff" : "#333",
            backgroundColor: timeSpan === "quarterly" ? "#333" : "#fff",
          }}
          className={`border border-[#333] px-4 py-1 text-sm font-semibold rounded-full transition-all`}
        >
          Quarterly
        </button>
      </div>
    </div>
  );
}

export default ReportTimeSpan;
