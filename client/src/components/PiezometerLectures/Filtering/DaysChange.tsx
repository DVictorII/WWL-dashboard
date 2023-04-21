import React from "react";
import { usePiezometerLecturesStateStore } from "../../../store/PiezometerLecturesStateStore";
import { useLocation } from "react-router-dom";
import { useNewPiezoReportStateStore } from "../../../store/NewPiezoReportStateStore";

function DaysChange() {
  const location = useLocation().pathname

  const days = location === "/piezometer-lectures" ? usePiezometerLecturesStateStore((s) => s.days): useNewPiezoReportStateStore((s) => s.days);
  const changeDays = location === "/piezometer-lectures" ? usePiezometerLecturesStateStore((s) => s.changeDays): useNewPiezoReportStateStore((s) => s.changeDays);

  return (
    <input
      type="number"
      max={1000}
      min={1}
      value={days}
      onChange={(e) => changeDays(Number(e.target.value))}
      className="px-2 md:px-3 py-1 text-sm md:text-base rounded-[8px] bg-[#333] text-white font-bold w-24"
    />
  );
}

export default DaysChange;
