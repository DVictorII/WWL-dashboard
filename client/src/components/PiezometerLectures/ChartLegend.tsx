import React from "react";
import { useSectionImgStore } from "../../store/sectionImgStore";

function ChartLegend({ chartType }: { chartType: string }) {
  if (chartType === "pressure")
    return (
      <div className="flex items-center gap-x-2">
        <div className="w-8 h-4 bg-[#477C9A] rounded-[4px]" />
        <span className="text-xs font-semibold">Pressure (KPa)</span>
      </div>
    );

  if (chartType === "wLevel")
    return (
      <div className="flex items-center gap-x-2">
        <div className="w-8 h-4 bg-[#BD6A1C] rounded-[4px]" />
        <span className="text-xs font-semibold">Water level (m)</span>
      </div>
    );

  if (chartType === "wElevation")
    return (
      <div className="flex items-center gap-x-2">
        <div className="w-8 h-4 bg-[#7B8831] rounded-[4px]" />
        <span className="text-xs font-semibold">Water elevation (RLm)</span>
      </div>
    );

  return <div></div>;
}

export default ChartLegend;
