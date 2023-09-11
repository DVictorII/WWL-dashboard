import React from "react";
import DaysChange from "./Filtering/DaysChange";
import LecturesChart from "./LecturesChart";
import SectionImg from "./SectionImg";
import { useLocation } from "react-router-dom";
import { usePiezometerLecturesStateStore } from "../../store/PiezometerLecturesStateStore";
import { useNewPiezoReportStateStore } from "../../store/NewPiezoReportStateStore";
import { useMonitoringMapStateStore } from "../../store/MonitoringMapStateStore";
import {
  pageStructureLinks,
  s3StaticFilesLinks,
} from "../../utils/globalLinks";
import GlobalSectionSubtitle from "../global/GlobalSectionSubtitle";
import PiezoReadingsSettings from "./PiezoReadingsSettings";
import FullScreenButton from "./FullScreenButton";

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
    <div className=" grid grid-cols-1 lg:grid-cols-2 ">
      <div className="flex flex-col  bg-white p-4 lg:border-r border-[#ccc] ">
        {location === pageStructureLinks.operations.piezometerReadings && (
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-y-4">
              <GlobalSectionSubtitle subtitle="Piezometer Readings" />
              <div className="flex items-center gap-x-3">
                <span className="  font-semibold text-[#666] text-sm">
                  Last
                </span>
                <DaysChange />
                <span className="  font-semibold text-[#666] text-sm">
                  days
                </span>
              </div>
            </div>

            <div className="flex items-center gap-x-4">
              <FullScreenButton comp={"chart"} />
              <PiezoReadingsSettings />
            </div>
          </div>
        )}

        {location === "/operations/reports/piezometers/new-report" && (
          <div className="flex flex-col gap-y-4">
            <GlobalSectionSubtitle subtitle="Piezometer Readings" />
            <div className="flex items-center gap-x-3">
              <span className="  font-semibold text-[#666] text-sm">
                {timeSpan === "weekly"
                  ? "Last week"
                  : timeSpan === "monthly"
                  ? "Last month"
                  : "Last 3 months"}
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 ">
          <LecturesChart />
        </div>
      </div>
      <div className="flex flex-col gap-y-6  bg-white p-4   ">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-y-4">
            <GlobalSectionSubtitle subtitle="Section profile view" />
            <span className="text-active-dark text-sm font-semibold">
              {currentPiezometer?.section === "?"
                ? "Indeterminate section"
                : currentPiezometer?.section}
            </span>
          </div>

          <div className="flex items-center gap-x-4">
            <FullScreenButton comp={"section"} />
          </div>
        </div>

        <SectionImg />
      </div>
    </div>
  );
}

export default PiezoLecturesComponent;
