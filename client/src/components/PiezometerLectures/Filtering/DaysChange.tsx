import React from "react";
import { usePiezometerLecturesStateStore } from "../../../store/PiezometerLecturesStateStore";
import { useLocation } from "react-router-dom";
import { useNewPiezoReportStateStore } from "../../../store/NewPiezoReportStateStore";

function DaysChange() {
  const location = useLocation().pathname;

  const days =
    location === "/operations/piezometer-readings"
      ? usePiezometerLecturesStateStore((s) => s.days)
      : useNewPiezoReportStateStore((s) => s.days);
  const changeDays =
    location === "/operations/piezometer-readings"
      ? usePiezometerLecturesStateStore((s) => s.changeDays)
      : useNewPiezoReportStateStore((s) => s.changeDays);

  return (
    <input
      type="number"
      max={1000}
      min={1}
      value={days}
      onChange={(e) => {
        if (!(Number(e.target.value) > Number(e.target.max)))
          return changeDays(Number(e.target.value));
      }}
      className="px-2 md:px-3 py-1 text-sm  rounded-lg bg-all-normal text-white font-bold w-20 focus:bg-orange-800 focus:outline-none transition-all"
    />
  );
}

export default DaysChange;
