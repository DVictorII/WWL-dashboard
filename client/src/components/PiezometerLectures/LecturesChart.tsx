import React from "react";
import ChartTypeTable from "./Filtering/ChartTypeTable";

import FullScreenButton from "./FullScreenButton";
import ChartLegend from "./ChartLegend";
//@ts-ignore
import BarChart from "./../BarChart";
import { useNewPiezoReportStateStore } from "../../store/NewPiezoReportStateStore";
import { useLocation } from "react-router-dom";
import { usePiezometerLecturesStateStore } from "../../store/PiezometerLecturesStateStore";

function LecturesChart() {
  const location = useLocation().pathname;

  const paddock =
    location === "/operations/piezometer-readings"
      ? usePiezometerLecturesStateStore((s) => s.paddock)
      : useNewPiezoReportStateStore((state) => state.paddock);
  const piezo =
    location === "/operations/piezometer-readings"
      ? usePiezometerLecturesStateStore((s) => s.piezo)
      : useNewPiezoReportStateStore((state) => state.piezo);
  const days =
    location === "/operations/piezometer-readings"
      ? usePiezometerLecturesStateStore((s) => s.days)
      : useNewPiezoReportStateStore((state) => state.days);
  const chartType =
    location === "/operations/piezometer-readings"
      ? usePiezometerLecturesStateStore((s) => s.chartType)
      : useNewPiezoReportStateStore((state) => state.chartType);

  return (
    <div className="flex flex-col gap-y-4 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
        <ChartTypeTable />
      </div>

      <BarChart
        information={{
          paddock,
          piezo,
          days,
          chartType,
        }}
      />
    </div>
  );
}

export default LecturesChart;
