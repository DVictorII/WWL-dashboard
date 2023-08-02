import React from "react";
import { useNewIncidentReportStateStore } from "../../../store/NewIncidentReportStateStore";

function IncidentTitle() {
  const title = useNewIncidentReportStateStore((state) => state.title);
  const changeTitle = useNewIncidentReportStateStore(
    (state) => state.changeTitle
  );
  return (
    <div className=" flex flex-col gap-y-1  xl:grid xl:grid-cols-3 gap-x-4">
      <span className="text-[10px] xl:text-xs  font-semibold text-[#666] justify-self-end">
        Incident title
      </span>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => changeTitle(e.target.value)}
        className=" xl:col-span-2 text-xs sm:text-sm bg-white text-[#333] font-semibold placeholder:text-[#dfdfdf] px-3 h-max py-2  rounded-lg shadow-sm border border-[#dfdfdf]  focus:outline-none focus:border-orange-500 focus:border-opacity-50 transition-all"
        placeholder="Title..."
      />
    </div>
  );
}

export default IncidentTitle;
