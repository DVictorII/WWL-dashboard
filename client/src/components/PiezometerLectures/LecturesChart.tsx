import React from "react";
import ChartTypeTable from "./Filtering/ChartTypeTable";

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
    <BarChart
      information={{
        paddock,
        piezo,
        days,
        chartType,
      }}
    />
  );
}

export default LecturesChart;
