import React from "react";

function SectionLegend() {
  return (
    <div className="w-full flex items-center gap-x-8 flex-wrap gap-y-3">
      <div className="flex items-center gap-x-2">
        <div className="w-8 h-4 bg-[rgb(123,136,49)] rounded-[4px]" />
        <span className="text-xs font-semibold">Original ground (RLm)</span>
      </div>
      <div className="flex items-center gap-x-2">
        <div className="w-8 h-4 bg-[rgb(135,101,56)] rounded-[4px]" />
        <span className="text-xs font-semibold">Tailing surface (RLm)</span>
      </div>
    </div>
  );
}

export default SectionLegend;
