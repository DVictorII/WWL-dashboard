import React from "react";
//@ts-ignore
import { boxShadowSlight } from "../utils/shadow";

interface DaysTableProps {
  handleChangeDays: (e: React.ChangeEvent<HTMLInputElement>) => void;
  applyFilters: () => void;
  daysState: number;
}

function DaysTable({
  handleChangeDays,
  applyFilters,
  daysState,
}: DaysTableProps) {
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    applyFilters();
  };

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3  p-4 sm:px-8 md:px-4 2xl:p-8 gap-x-4 gap-y-10 rounded-[18px] "
      style={{ boxShadow: boxShadowSlight }}
    >
      <div className="font-semibold text-lg 2xl:text-2xl">Change date</div>

      <div className="flex gap-x-4 items-center">
        <span className="2xl:text-lg">Last</span>
        <input
          type="number"
          value={daysState}
          onChange={handleChangeDays}
          name="days"
          className="pb-1 border-b-2 border-bluePrimary focus:outline-none focus:border-orangeSecondary 2xl:text-2xl w-14 2xl:w-20"
        />
        <span className="2xl:text-lg">days</span>
      </div>

      <div className="col-span-2 sz450:col-span-1">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-orangeSecondary rounded-[14px] bg-opacity-90 text-white text-lg font-semibold 2xl:text-xl w-full sz450:w-max"
        >
          Apply filters
        </button>
      </div>
    </div>
  );
}

export default DaysTable;
