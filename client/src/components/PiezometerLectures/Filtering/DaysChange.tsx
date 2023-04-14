import React from "react";
import { usePiezometerLecturesStateStore } from "../../../store/PiezometerLecturesStateStore";

function DaysChange() {
  const days = usePiezometerLecturesStateStore((s) => s.days);
  const changeDays = usePiezometerLecturesStateStore((s) => s.changeDays);

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
