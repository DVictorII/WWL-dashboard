import React from "react";
import { useNewIncidentReportStateStore } from "../../../store/NewIncidentReportStateStore";

function IncidentLongitude() {
  const longitude = useNewIncidentReportStateStore((state) => state.longitude);
  const changeLongitude = useNewIncidentReportStateStore(
    (state) => state.changeLongitude
  );

  return (
    <div className=" flex flex-col gap-y-1  xl:grid xl:grid-cols-3 gap-x-4">
      <span className="text-[10px] xl:text-xs  font-semibold text-[#666] justify-self-end">
        Site Longitude (°)
      </span>
      <input
        type="number"
        name="longitude"
        value={Number(longitude).toFixed(6)}
        onChange={(e) => changeLongitude(e.target.value)}
        disabled
        className=" xl:col-span-2 text-xs sm:text-sm bg-[#f5f5f5] disabled:text-[#777] text-[#333] font-semibold placeholder:text-[#dfdfdf] px-3 h-max py-2  rounded-lg shadow-sm border border-[#dfdfdf]  focus:outline-none focus:border-orange-500 focus:border-opacity-50 transition-all"
        placeholder="Longitude..."
      />
    </div>
  );
}

export default IncidentLongitude;
