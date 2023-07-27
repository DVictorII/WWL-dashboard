import React from "react";

function SectionLegend() {
  return (
    <div className="w-full flex items-center gap-x-8 flex-wrap gap-y-3">
      <div className="flex items-center gap-x-2">
        <div className="w-8 h-4 bg-[rgb(123,136,49)] rounded-[4px]" />
        <span className="text-xs font-semibold">Ground lvl (RLm)</span>
      </div>
      <div className="flex items-center gap-x-2">
        <div className="w-8 h-4 bg-[rgb(135,101,56)] rounded-[4px]" />
        <span className="text-xs font-semibold">2022 Survey lvl (RLm)</span>
      </div>
      <div className="flex items-center gap-x-2">
        <div className="w-8 h-4 bg-[rgb(37,109,123)] rounded-[4px]" />
        <span className="text-xs font-semibold">Water lvl (m)</span>
      </div>
    </div>
  );
}

export default SectionLegend;
