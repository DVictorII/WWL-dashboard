import React from "react";
import BarChart from "../../BarChart";
import { useNewPiezoReportStateStore } from "../../../store/NewPiezoReportStateStore";
import { ReportDetails } from "../../../types";

import ChartTypeTable from "../../PiezometerLectures/Filtering/ChartTypeTable";

function DetailsReportLecturesChart({ report }: { report: ReportDetails }) {
  const {
    report_paddock: paddock,
    report_piezo: piezo,
    report_time_span: timeSpan,
  } = report;

  const days = timeSpan === "weekly" ? 7 : timeSpan === "monthly" ? 31 : 93;
  const chartType = useNewPiezoReportStateStore((state) => state.chartType);

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

export default DetailsReportLecturesChart;
