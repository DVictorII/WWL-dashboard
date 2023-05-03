import React from "react";
import { useSectionImgStore } from "../../store/sectionImgStore";

function ChartLegend() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-8 h-4 bg-active-normal rounded-[4px]" />
      <span className="text-xs font-semibold">Pressure (KPa)</span>
    </div>
  );
}

export default ChartLegend;
