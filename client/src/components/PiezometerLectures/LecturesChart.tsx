import React from "react";
import ChartTypeTable from "./Filtering/ChartTypeTable";

import FullScreenButton from "./FullScreenButton";
import ChartLegend from "./ChartLegend";
//@ts-ignore
import BarChart from "./../BarChart"
import { useNewPiezoReportStateStore } from "../../store/NewPiezoReportStateStore";
import { useLocation } from "react-router-dom";
import { usePiezometerLecturesStateStore } from "../../store/PiezometerLecturesStateStore";

function LecturesChart() {
  const location = useLocation().pathname

  const paddock = location === "/piezometer-lectures" ? usePiezometerLecturesStateStore((s) => s.paddock):  useNewPiezoReportStateStore((state) => state.paddock);
  const piezo =  location === "/piezometer-lectures" ? usePiezometerLecturesStateStore((s) => s.piezo):  useNewPiezoReportStateStore((state) => state.piezo);
  const days =  location === "/piezometer-lectures" ? usePiezometerLecturesStateStore((s) => s.days):  useNewPiezoReportStateStore((state) => state.days);
  const chartType =  location === "/piezometer-lectures" ? usePiezometerLecturesStateStore((s) => s.chartType):  useNewPiezoReportStateStore((state) => state.chartType);


  return (
    <div className="flex flex-col gap-y-4">
      <ChartTypeTable />
      
      <div className="h-[50vh] w-full">
        <BarChart information={{
          paddock,piezo,days,chartType
        }}/>
      </div>
      
      <div className="w-full flex justify-between gap-x-16 flex-wrap gap-y-8 ">
        <FullScreenButton />
        <ChartLegend />
      </div>
    </div>
  );
}

export default LecturesChart;
