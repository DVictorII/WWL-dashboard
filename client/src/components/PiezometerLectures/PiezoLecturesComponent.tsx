import React from "react";
import DaysChange from "./Filtering/DaysChange";
import LecturesChart from "./LecturesChart";
import SectionImg from "./SectionImg";
import { useLocation } from "react-router-dom";
import { usePiezometerLecturesStateStore } from "../../store/PiezometerLecturesStateStore";
import { useNewPiezoReportStateStore } from "../../store/NewPiezoReportStateStore";

function PiezoLecturesComponent() {
  const location = useLocation().pathname;

  const paddock =
    location === "/piezometer-readings"
      ? usePiezometerLecturesStateStore((s) => s.paddock)
      : useNewPiezoReportStateStore((state) => state.paddock);
  const piezo =
    location === "/piezometer-readings"
      ? usePiezometerLecturesStateStore((s) => s.piezo)
      : useNewPiezoReportStateStore((state) => state.piezo);

  const timeSpan = useNewPiezoReportStateStore((state) => state.timeSpan);

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2  lg:gap-x-6 xl:gap-x-8 gap-y-8  ">
      <div className="flex flex-col  bg-white p-4 2xl:p-6 rounded-xl shadow-sm">
        {location === "/piezometer-readings" && (
          <h2 className="flex items-center gap-x-2 md:gap-x-4 flex-wrap gap-y-2">
            <span className="  font-semibold">Piezometer Readings / Last</span>
            <DaysChange />
            <span className="  font-semibold">days</span>
          </h2>
        )}

        {location === "/reports/piezometers/new-report" && (
          <h2 className="flex items-center gap-x-2 md:gap-x-2 flex-wrap gap-y-2">
            <span className="  font-semibold">Piezometer Readings</span>
            <span className="  font-semibold">/</span>
            <span className="  font-semibold">
              {timeSpan === "weekly"
                ? "Last week"
                : timeSpan === "monthly"
                ? "Last month"
                : "Last 3 months"}
            </span>
          </h2>
        )}

        <div className="mt-6" />

        <LecturesChart />
      </div>
      <div className="flex flex-col justify-between  bg-white p-4 2xl:p-6 rounded-xl shadow-sm  font-semibold  ">
        <h2 className="flex items-center gap-x-2 flex-wrap gap-y-2">
          Section profile view
        </h2>

        
        <SectionImg />
      </div>
    </div>
  );
}

export default PiezoLecturesComponent;
