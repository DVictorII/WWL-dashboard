import React from "react";
import { ReportDetails } from "../../../types";

import { useMonitoringMapStateStore } from "../../../store/MonitoringMapStateStore";
import DetailsReportLecturesChart from "./DetailsReportLecturesChart";

import DetailsReportSectionImg from "./DetailsReportSectionImg";

function DetailsReportPiezoLecturesComponent({
  report,
}: {
  report: ReportDetails;
}) {
  const {
    report_paddock: paddock,
    report_piezo: piezo,
    report_time_span: timeSpan,
  } = report;

  const piezometersData = useMonitoringMapStateStore((s) => s.piezometersData);

  const currentPiezometer = piezometersData.find(
    (p) => p.paddock === paddock && p.id === piezo
  );

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2  lg:gap-x-6 xl:gap-x-8 gap-y-8  ">
      <div className="flex flex-col  bg-white p-4 2xl:p-6 rounded-xl shadow-sm">
        <h2 className="flex items-center gap-x-2 md:gap-x-2 flex-wrap gap-y-2 font-semibold text-[#555]">
          <span>Piezometer Readings</span>
          <span>/</span>
          <span>
            {timeSpan === "weekly"
              ? "Weekly report"
              : timeSpan === "monthly"
              ? "Monthly report"
              : "Quarterly report"}
          </span>
        </h2>

        <div className="mt-6" />

        <DetailsReportLecturesChart report={report} />
      </div>
      <div className="flex flex-col gap-y-6  bg-white p-4 2xl:p-6 rounded-xl shadow-sm  font-semibold  ">
        <div className="flex items-center gap-x-6 font-semibold text-[#555]">
          <h2>Section profile view</h2>

          <span>/</span>
          <span className="text-active-dark">
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

        <DetailsReportSectionImg report={report} />
      </div>
    </div>
  );
}

export default DetailsReportPiezoLecturesComponent;
