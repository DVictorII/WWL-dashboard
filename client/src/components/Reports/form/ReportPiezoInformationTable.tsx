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
      className="w-full h-[calc(15rem + 4px)] overflow-y-auto rounded-[4px] border-y-2  relative bg-white"
    >
      <div
        style={{
          backgroundColor: statusStateObj.washedColor,
        }}
        className="w-full grid grid-cols-2  text-[10px] xl:text-[11px] h-12   "
      >
        <div
          style={{
            borderColor: statusStateObj.intermediateColor,
          }}
          className="flex items-center  justify-center px-2 border-r-2 border-b"
        >
          <span className="text-center  font-bold text-[11px] xl:text-xs">
            Location coordinates:
          </span>
        </div>

        <div
          style={{
            borderColor: statusStateObj.intermediateColor,
          }}
          className="flex items-center  justify-center px-2 border-b"
        >
          <span className="text-center  font-semibold ">
            {Number(currentPiezometer?.lat).toFixed(8)}° /{" "}
            {Number(currentPiezometer?.lon).toFixed(8)}°
          </span>
        </div>
      </div>

      <div className="w-full grid grid-cols-2  text-[10px] xl:text-[11px] h-12   ">
        <div
          style={{
            borderColor: statusStateObj.intermediateColor,
          }}
          className="flex items-center  justify-center px-2 border-r-2 border-b"
        >
          <span className="text-center  font-bold text-[11px] xl:text-xs">
            Section:
          </span>
        </div>

        <div
          style={{
            borderColor: statusStateObj.intermediateColor,
          }}
          className="flex items-center  justify-center px-2 border-b"
        >
          <span
            className={`text-center  font-semibold ${
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
        </div>
      </div>

      <div
        style={{
          backgroundColor: statusStateObj.washedColor,
        }}
        className="w-full grid grid-cols-2  text-[10px] xl:text-[11px] h-12   "
      >
        <div
          style={{
            borderColor: statusStateObj.intermediateColor,
          }}
          className="flex items-center  justify-center px-2 border-r-2 border-b"
        >
          <span className="text-center  font-bold text-[11px] xl:text-xs">
            Avg. PWP ({timeSpan} report):
          </span>
        </div>

        <div
          style={{
            borderColor: statusStateObj.intermediateColor,
          }}
          className="flex items-center  justify-center px-2 border-b"
        >
          <span
            className={
              lecturesInformation.lecturesAvg === 0
                ? "text-xl text-center  font-semibold"
                : "text-center  font-semibold"
            }
          >
            {lecturesInformation.lecturesAvg === 0
              ? "-"
              : `${lecturesInformation.lecturesAvg} KPa`}
          </span>
        </div>
      </div>

      <div className="w-full grid grid-cols-2  text-[10px] xl:text-[11px] h-12   ">
        <div
          style={{
            borderColor: statusStateObj.intermediateColor,
          }}
          className="flex items-center  justify-center px-2 border-r-2 border-b"
        >
          <span className="text-center  font-bold text-[11px] xl:text-xs">
            Max. PWP ({timeSpan} report)
          </span>
        </div>

        <div
          style={{
            borderColor: statusStateObj.intermediateColor,
          }}
          className="flex items-center  justify-center px-2 border-b"
        >
          <span
            className={
              lecturesInformation.lecturesMax === 0
                ? "text-xl text-center  font-semibold"
                : "text-center  font-semibold"
            }
          >
            {lecturesInformation.lecturesMax === 0
              ? "-"
              : `${lecturesInformation.lecturesMax} KPa`}
          </span>
        </div>
      </div>

      <div
        style={{
          backgroundColor: statusStateObj.washedColor,
        }}
        className="w-full grid grid-cols-2  text-[10px] xl:text-[11px] h-12   "
      >
        <div
          style={{
            borderColor: statusStateObj.intermediateColor,
          }}
          className="flex items-center  justify-center px-2 border-r-2 border-b"
        >
          <span className="text-center  font-bold text-[11px] xl:text-xs">
            Min. PWP ({timeSpan} report)
          </span>
        </div>

        <div
          style={{
            borderColor: statusStateObj.intermediateColor,
          }}
          className="flex items-center  justify-center px-2 border-b"
        >
          <span
            className={
              lecturesInformation.lecturesMin === 0
                ? "text-xl text-center  font-semibold"
                : " text-center  font-semibold"
            }
          >
            {lecturesInformation.lecturesMin === 0
              ? "-"
              : `${lecturesInformation.lecturesMin} KPa`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ReportPiezoInformationTable;
