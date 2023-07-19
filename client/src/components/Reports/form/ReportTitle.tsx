import React from "react";
import { useNewPiezoReportStateStore } from "../../../store/NewPiezoReportStateStore";

function ReportTitle() {
  const title = useNewPiezoReportStateStore((state) => state.title);
  const changeTitle = useNewPiezoReportStateStore((state) => state.changeTitle);

  return (
    <div className=" flex flex-col gap-y-1  xl:grid xl:grid-cols-3 gap-x-4">
      <span className="text-[10px] xl:text-xs 2xl:text-sm font-bold text-[#555] justify-self-end">
        Report title
      </span>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => changeTitle(e.target.value)}
        className=" xl:col-span-2 text-xs sm:text-sm bg-[#f5f5f5] text-[#333] font-semibold placeholder:text-[#dfdfdf] px-3 h-10 2xl:h-12 rounded-lg shadow-sm border border-[#dfdfdf]  focus:outline-none focus:border-orange-500 focus:border-opacity-50 transition-all"
        placeholder="Title..."
      />
    </div>
  );
}

export default ReportTitle;
