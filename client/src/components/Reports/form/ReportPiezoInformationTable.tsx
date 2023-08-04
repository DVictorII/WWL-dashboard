import { monitoringMapStatusInfo } from "../../../utils/monitoringMapStatusInfo";

import { useNewPiezoReportStateStore } from "../../../store/NewPiezoReportStateStore";
import { useMonitoringMapStateStore } from "../../../store/MonitoringMapStateStore";

function ReportPiezoInformationTable() {
  const lecturesInformation = useNewPiezoReportStateStore(
    (state) => state.lecturesInformation
  );

  const paddock = useNewPiezoReportStateStore((state) => state.paddock);
  const piezo = useNewPiezoReportStateStore((state) => state.piezo);

  const piezometersData = useMonitoringMapStateStore((s) => s.piezometersData);

  const currentPiezometer = piezometersData.find(
    (p) => p.paddock === paddock && p.id === piezo
  );

  const { inoperativeDates } = lecturesInformation;

  const timeSpan = useNewPiezoReportStateStore((state) => state.timeSpan);

  //@ts-ignore
  const statusStateObj = monitoringMapStatusInfo[currentPiezometer.status];

  return (
    <div
      style={{
        borderColor: statusStateObj.darkColor,
      }}
      className="max-w-[1000vh] h-[19rem] overflow-x-auto rounded-lg border-2  relative bg-white"
    >
      <table className="   select-none w-full border-collapse  bg-white">
        <tbody>
          <tr
            style={{
              backgroundColor: statusStateObj.lightColor,
            }}
            className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12   "
          >
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px]">
              <span>Location coordinates:</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <span>
                {Number(currentPiezometer?.lat).toFixed(8)}° /{" "}
                {Number(currentPiezometer?.lon).toFixed(8)}°
              </span>
            </th>
          </tr>

          <tr className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12 bg-white ">
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px]">
              <span>Section:</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <span
                className={`${
                  currentPiezometer?.section &&
                  currentPiezometer?.section !== "?" &&
                  currentPiezometer?.section !== "None"
                    ? ""
                    : "text-xl"
                }`}
              >
                {currentPiezometer?.section &&
                currentPiezometer?.section !== "?" &&
                currentPiezometer?.section !== "None"
                  ? currentPiezometer?.section
                  : "-"}
              </span>
            </th>
          </tr>

          <tr
            style={{
              backgroundColor: statusStateObj.lightColor,
            }}
            className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12  "
          >
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px]">
              <span>Avg. PWP ({timeSpan} report):</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <span
                className={
                  lecturesInformation.lecturesAvg === 0 ? "text-xl" : ""
                }
              >
                {lecturesInformation.lecturesAvg === 0
                  ? "-"
                  : `${lecturesInformation.lecturesAvg} KPa`}
              </span>
            </th>
          </tr>

          <tr className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12 bg-white ">
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px]">
              <span>Max. PWP ({timeSpan} report)</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <span
                className={
                  lecturesInformation.lecturesMax === 0 ? "text-xl" : ""
                }
              >
                {lecturesInformation.lecturesMax === 0
                  ? "-"
                  : `${lecturesInformation.lecturesMax} KPa`}
              </span>
            </th>
          </tr>

          <tr
            style={{
              backgroundColor: statusStateObj.lightColor,
            }}
            className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12  "
          >
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px]">
              <span>Min. PWP ({timeSpan} report)</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <span
                className={
                  lecturesInformation.lecturesMin === 0 ? "text-xl" : ""
                }
              >
                {lecturesInformation.lecturesMin === 0
                  ? "-"
                  : `${lecturesInformation.lecturesMin} KPa`}
              </span>
            </th>
          </tr>

          {/* <tr className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12 bg-white ">
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold  text-[11px]">
              <span>Report time interval</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <span className={`${lastReadingExists ? "" : "text-xl"}`}>
                {lastReadingExists ? lastReading.time : "-"}
              </span>
            </th>
          </tr> */}
        </tbody>
      </table>
      <div
        style={{
          backgroundColor: statusStateObj.lightColor,
        }}
        className="absolute top-0 left-1/2 w-[2px] h-[19rem] "
      />
    </div>
  );
}

export default ReportPiezoInformationTable;
