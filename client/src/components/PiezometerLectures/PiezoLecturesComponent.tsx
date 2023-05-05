import React from "react";
import DaysChange from "./Filtering/DaysChange";
import LecturesChart from "./LecturesChart";
import SectionImg from "./SectionImg";

function PiezoLecturesComponent() {
  return (
    <div className=" flex flex-col gap-y-10 rounded-xl py-8">
      <h2 className="flex items-center gap-x-2 md:gap-x-4 flex-wrap gap-y-2">
        <span className="text-sm md:text-base font-semibold">
          Piezometer lectures / Last
        </span>
        <DaysChange />
        <span className="text-sm md:text-base font-semibold">days</span>
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 xl:gap-x-10 gap-y-10 ">
        <LecturesChart />
        <SectionImg />
      </div>
    </div>
  );
}

export default PiezoLecturesComponent;
