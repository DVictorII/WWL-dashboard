import React from "react";
import DaysChange from "./Filtering/DaysChange";
import LecturesChart from "./LecturesChart";
import SectionImg from "./SectionImg";

function PiezoLecturesComponent() {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2  lg:gap-x-6 xl:gap-x-8 gap-y-8  ">
      <div className="flex flex-col  bg-white p-4 2xl:p-6 rounded-xl shadow-sm">
        <h2 className="flex items-center gap-x-2 md:gap-x-4 flex-wrap gap-y-2">
          <span className="text-sm  font-semibold">
            Piezometer Readings / Last
          </span>
          <DaysChange />
          <span className="text-sm  font-semibold">days</span>
        </h2>

        <div className="mt-6" />

        <LecturesChart />
      </div>
      <div className="flex flex-col  bg-white p-4 2xl:p-6 rounded-xl shadow-sm justify-center ">
        <h2 className="flex items-center gap-x-2 flex-wrap gap-y-2">
          <span className="  font-semibold text-lg md:text-xl lg:text-2xl ">
            CDIII
          </span>

          <span className="  font-semibold text-lg md:text-xl lg:text-2xl ">
            -
          </span>

          <span className="  font-semibold text-lg md:text-xl lg:text-2xl ">
            VW-CD3-01
          </span>
        </h2>

        <div className="mt-8" />
        <SectionImg />
      </div>
    </div>
  );
}

export default PiezoLecturesComponent;
