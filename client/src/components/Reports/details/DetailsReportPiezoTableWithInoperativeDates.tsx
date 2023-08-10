import { ReportDetails } from "../../../types";
import { useMonitoringMapStateStore } from "../../../store/MonitoringMapStateStore";
import DetailsReportPiezoInformationTable from "./DetailsReportPiezoInformationTable";
import DetailsReportInoperativeDatesTable from "./DetailsReportInoperativeDatesTable";

function DetailsReportPiezoTableWithInoperativeDates({
  report,
  displaying,
  handleToggleTable,
}: {
  report: ReportDetails;
  displaying: string;
  handleToggleTable: () => void;
}) {
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
