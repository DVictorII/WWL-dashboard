import React from "react";
import DaysChange from "./Filtering/DaysChange";
import LecturesChart from "./LecturesChart";
import SectionImg from "./SectionImg";
import { useLocation } from "react-router-dom";
import { usePiezometerLecturesStateStore } from "../../store/PiezometerLecturesStateStore";
import { useNewPiezoReportStateStore } from "../../store/NewPiezoReportStateStore";
import { useMonitoringMapStateStore } from "../../store/MonitoringMapStateStore";

function PiezoLecturesComponent() {
  const location = useLocation().pathname;

  const paddock =
    location === "/operations/piezometer-readings"
      ? usePiezometerLecturesStateStore((s) => s.paddock)
      : useNewPiezoReportStateStore((state) => state.paddock);
  const piezo =
    location === "/operations/piezometer-readings"
      ? usePiezometerLecturesStateStore((s) => s.piezo)
      : useNewPiezoReportStateStore((state) => state.piezo);

  const piezometersData = useMonitoringMapStateStore((s) => s.piezometersData);

  const currentPiezometer = piezometersData.find(
    (p) => p.paddock === paddock && p.id === piezo
  );

  const section = usePiezometerLecturesStateStore((s) => s.section);

  const timeSpan = useNewPiezoReportStateStore((state) => state.timeSpan);

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2  lg:gap-x-6 gap-y-6  ">
      <div className="flex flex-col  bg-white p-4 2xl:p-6 rounded-xl shadow-sm">
        {location === "/operations/piezometer-readings" && (
          <h2 className="flex items-center gap-x-2 md:gap-x-4 flex-wrap gap-y-2">
            <span className="  font-semibold text-[#555]">
              Piezometer Readings / Last
            </span>
            <DaysChange />
            <span className="  font-semibold text-[#555]">days</span>
          </h2>
        )}

        {location === "/operations/reports/piezometers/new-report" && (
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
      <div className="flex flex-col gap-y-6  bg-white p-4 2xl:p-6 rounded-xl shadow-sm  font-semibold  ">
        <div className="flex items-center gap-x-6">
          <h2 className="flex items-center gap-x-2 flex-wrap gap-y-2 text-[#555]">
            Section profile view
          </h2>

          <span>/</span>
          <span className="text-2xl">
            {currentPiezometer?.section === "?"
              ? "Indeterminate section"
              : currentPiezometer?.section}
          </span>

          {/* {location === "/operations/piezometer-readings" && (
            <>
              <span>/</span>
              <span className="text-2xl">
                {section === "?" ? "Indeterminate section" : section}
              </span>
            </>
          )} */}
        </div>

        <SectionImg />
      </div>
    </div>
  );
}

export default PiezoLecturesComponent;
