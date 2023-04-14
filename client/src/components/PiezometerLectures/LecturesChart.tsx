import React from "react";
import ChartTypeTable from "./Filtering/ChartTypeTable";

import FullScreenButton from "./FullScreenButton";
import ChartLegend from "./ChartLegend";
//@ts-ignore
import BarChart from "./../BarChart"

function LecturesChart() {
  return (
    <div className="flex flex-col gap-y-4">
      <ChartTypeTable />
      
      <div className="h-[50vh] w-full">

        <BarChart />
      </div>
      
      <div className="w-full flex justify-between gap-x-16 flex-wrap gap-y-8 ">
        <FullScreenButton />
        <ChartLegend />
      </div>
    </div>
  );
}

export default LecturesChart;
