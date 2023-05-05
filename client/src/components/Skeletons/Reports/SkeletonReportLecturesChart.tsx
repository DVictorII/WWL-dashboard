import React from "react";
import ChartTypeTable from "../../PiezometerLectures/Filtering/ChartTypeTable";
import SkeletonBarChart from "../PiezometerLectures/SkeletonBarChart";

function SkeletonReportLecturesChart() {
  return (
    <div className="flex flex-col gap-y-4">
      <ChartTypeTable />

      <SkeletonBarChart />
    </div>
  );
}

export default SkeletonReportLecturesChart;
