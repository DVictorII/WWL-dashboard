import React, { useEffect } from "react";
import { useNewPiezoReportStateStore } from "../../../store/NewPiezoReportStateStore";

function ReportDescription() {
  const description = useNewPiezoReportStateStore((state) => state.description);
  const changeDescription = useNewPiezoReportStateStore(
    (state) => state.changeDescription
  );

  return (
    <div className=" flex flex-col gap-y-1  xl:grid xl:grid-cols-3 gap-x-4">
      <span className="text-[10px] xl:text-xs 2xl:text-sm font-bold text-[#555] justify-self-end w-max">
        Report description
      </span>
      <textarea
        name="description"
        value={description}
        onChange={(e) => changeDescription(e.target.value)}
        className="xl:col-span-2 text-xs sm:text-sm bg-[#f5f5f5] text-[#333] font-semibold placeholder:text-[#dfdfdf] px-3 py-3 h-14 2xl:h-16 rounded-lg shadow-sm border border-[#dfdfdf]  focus:outline-none focus:border-orange-500 focus:border-opacity-50  transition-all"
        placeholder="Description..."
      />
    </div>
  );
}

export default ReportDescription;
