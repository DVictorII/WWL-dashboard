import React from "react";
import { useLocation } from "react-router-dom";
import { useNewPiezoReportStateStore } from "../../store/NewPiezoReportStateStore";
import ChartTypeTable from "../PiezometerLectures/Filtering/ChartTypeTable";

//@ts-ignore
import BarChart from "../BarChart";

function ReportLecturesChart({
  paddock,
  piezo,
}: {
  paddock: string;
  piezo: string;
}) {
  const days = useNewPiezoReportStateStore((state) => state.days);
  const chartType = useNewPiezoReportStateStore((state) => state.chartType);

  return (
    <div className="flex flex-col gap-y-4">
      <ChartTypeTable />

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

export default ReportLecturesChart;
