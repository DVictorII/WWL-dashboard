import React from "react";
import { useNewIncidentReportStateStore } from "../../../store/NewIncidentReportStateStore";

function IncidentLatitude() {
  const latitude = useNewIncidentReportStateStore((state) => state.latitude);
  const changeLatitude = useNewIncidentReportStateStore(
    (state) => state.changeLatitude
  );

  return (
    <div className=" flex flex-col gap-y-1  xl:grid xl:grid-cols-3 gap-x-4">
      <span className="text-[10px] xl:text-xs  font-semibold text-[#666] justify-self-end">
        Site Latitude (°)
      </span>
      <input
        type="number"
        name="latitude"
        value={Number(latitude).toFixed(6)}
        onChange={(e) => changeLatitude(e.target.value)}
        disabled
        className=" xl:col-span-2 text-xs sm:text-sm bg-[#f5f5f5] disabled:text-[#777] text-[#333] font-semibold placeholder:text-[#dfdfdf] px-3 h-max py-2  rounded-lg shadow-sm border border-[#dfdfdf]  focus:outline-none focus:border-orange-500 focus:border-opacity-50 transition-all"
        placeholder="Latitude..."
      />
    </div>
  );
}

export default IncidentLatitude;
