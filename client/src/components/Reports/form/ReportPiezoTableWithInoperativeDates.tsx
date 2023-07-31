import React, { useState } from "react";
import ReportPiezoInformationTable from "./ReportPiezoInformationTable";
import ReportInoperativeDatesTable from "./ReportInoperativeDatesTable";
import { useNewPiezoReportStateStore } from "../../../store/NewPiezoReportStateStore";
import { useMonitoringMapStateStore } from "../../../store/MonitoringMapStateStore";
import { useQuery } from "react-query";
import {
  fetchReportLectures,
  processLecturesData,
} from "../../../utils/reportsFetchFunctions";
import moment from "moment";

function ReportPiezoTableWithInoperativeDates({
  displaying,
  handleToggleTable,
}: {
  displaying: string;
  handleToggleTable: () => void;
}) {
  // const [displaying, setDisplaying] = useState("inoperativeDates");

  const paddock = useNewPiezoReportStateStore((state) => state.paddock);
  const piezo = useNewPiezoReportStateStore((state) => state.piezo);
  const timeSpan = useNewPiezoReportStateStore((state) => state.timeSpan);

  const DAYS_SPAN =
    timeSpan === "weekly" ? 7 : timeSpan === "monthly" ? 31 : 92;

  const piezometersData = useMonitoringMapStateStore((s) => s.piezometersData);
  const lastReadings = useMonitoringMapStateStore((s) => s.lastReadings);

  const setLecturesInformation = useNewPiezoReportStateStore(
    (state) => state.setLecturesInformation
  );

  const lecturesInformation = useNewPiezoReportStateStore(
    (state) => state.lecturesInformation
  );

  const currentPiezometer = piezometersData.find(
    (p) => p.paddock === paddock && p.id === piezo
  );

  const { isLoading: lecturesAreLoading, data: lecturesData } = useQuery({
    queryKey: [
      `lecturesData-node_${currentPiezometer?.datalogger}_${currentPiezometer?.channel}-${DAYS_SPAN}`,
      currentPiezometer?.datalogger,
      currentPiezometer?.channel,
    ],
    queryFn: () =>
      fetchReportLectures(
        currentPiezometer?.datalogger as number,
        currentPiezometer?.channel as number,
        DAYS_SPAN
      ),
    onSuccess(data) {
      const processedLectures = processLecturesData(
        data,
        lastReadings,
        currentPiezometer
      );
      setLecturesInformation(processedLectures);
    },

    onError(err) {
      setLecturesInformation({
        lectures: [],
        inoperativeDates: [],
        lecturesAvg: 0,
        lecturesMax: 0,
        lecturesMin: 0,
        lastReading: {
          pressure: "0",
          time: moment(Date.now()).format("YYYY-MM-DD"),
        },
      });
    },
    // The query will not execute until the userId exists
    // enabled: !!currentPiezometer?.datalogger && !!currentPiezometer?.channel,
    refetchOnWindowFocus: false,
  });

  if (lecturesAreLoading) return <h1>Loading...</h1>;

  return (
    <div>
      {displaying === "piezoInfo" ? (
        <ReportPiezoInformationTable />
      ) : (
        <ReportInoperativeDatesTable />
      )}
    </div>
  );
}

export default ReportPiezoTableWithInoperativeDates;
