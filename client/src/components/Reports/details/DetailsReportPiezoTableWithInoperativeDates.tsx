import React, { useState } from "react";
import { ReportDetails } from "../../../types";
import { useMonitoringMapStateStore } from "../../../store/MonitoringMapStateStore";
import DetailsReportPiezoInformationTable from "./DetailsReportPiezoInformationTable";
import DetailsReportInoperativeDatesTable from "./DetailsReportInoperativeDatesTable";

function DetailsReportPiezoTableWithInoperativeDates({
  report,
}: {
  report: ReportDetails;
}) {
  // const [displaying, setDisplaying] = useState("inoperativeDates");
  const [displaying, setDisplaying] = useState("A");

  const paddock = report.report_paddock;
  const piezo = report.report_piezo;
  const timeSpan = report.report_time_span;

  const DAYS_SPAN =
    timeSpan === "weekly" ? 7 : timeSpan === "monthly" ? 31 : 92;

  const piezometersData = useMonitoringMapStateStore((s) => s.piezometersData);
  const lastReadings = useMonitoringMapStateStore((s) => s.lastReadings);

  const lecturesInformation = JSON.parse(report.report_readings_information);

  console.log("READINGS INFO", lecturesInformation);

  const currentPiezometer = piezometersData.find(
    (p) => p.paddock === paddock && p.id === piezo
  );

  return (
    <div>
      {displaying === "piezoInfo" ? (
        <DetailsReportPiezoInformationTable report={report} />
      ) : (
        <DetailsReportInoperativeDatesTable report={report} />
      )}
    </div>
  );
}

export default DetailsReportPiezoTableWithInoperativeDates;
