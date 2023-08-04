import React from "react";
import { useNewIncidentReportStateStore } from "../../../store/NewIncidentReportStateStore";

function IncidentDescription() {
  const description = useNewIncidentReportStateStore(
    (state) => state.description
  );
  const changeDescription = useNewIncidentReportStateStore(
    (state) => state.changeDescription
  );

  return (
    <div className=" flex flex-col gap-y-1  xl:grid xl:grid-cols-3 gap-x-4">
      <span className="text-[10px] xl:text-xs  font-semibold text-[#666] justify-self-end">
        Incident description
      </span>
      <textarea
        name="description"
        value={description}
        rows={3}
        onChange={(e) => changeDescription(e.target.value)}
        className="xl:col-span-2 text-xs sm:text-sm bg-white text-[#333] font-semibold placeholder:text-[#dfdfdf] px-3 py-2 h-auto rounded-lg shadow-sm border border-[#dfdfdf]  focus:outline-none focus:border-orange-500 focus:border-opacity-50  transition-all"
        placeholder="Description..."
      />
    </div>
  );
}

export default IncidentDescription;
