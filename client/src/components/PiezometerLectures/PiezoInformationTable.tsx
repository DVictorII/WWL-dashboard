import { usePiezometerLecturesStateStore } from "../../store/PiezometerLecturesStateStore";

import { monitoringMapStatusInfo } from "../../utils/monitoringMapStatusInfo";
import { capitalizeName } from "../../utils/monitoringMapStatusInfo";

import SkeletonPiezoInformationTable from "../Skeletons/PiezometerLectures/SkeletonPiezoInformationTable";
import { useMonitoringMapStateStore } from "../../store/MonitoringMapStateStore";
import moment from "moment";

function PiezoInformationTable({
  information,
}: {
  information: {
    paddock: string;
    piezo: string;
  };
}) {
  const piezometersData = useMonitoringMapStateStore((s) => s.piezometersData);
  const lastReadings = useMonitoringMapStateStore((s) => s.lastReadings);

  const currentPiezometer = piezometersData.find(
    (p) => p.id === information.piezo
  );

  if (!currentPiezometer) return <SkeletonPiezoInformationTable />;

  const lastReading = lastReadings?.find(
    //@ts-ignore
    (reading) =>
      reading.node === currentPiezometer?.datalogger &&
      reading.channel === currentPiezometer?.channel
  );

  const lastReadingExists =
    lastReading && lastReading.pressure && Number(lastReading.pressure);

  const depthIsZero = Number(currentPiezometer?.depth) == 0;

  //@ts-ignore
  const statusStateObj = monitoringMapStatusInfo[currentPiezometer?.status];

  return (
    <div
      style={{
        borderColor: statusStateObj.darkColor,
      }}
      className="w-full h-[calc(24rem + 4px)] overflow-y-auto rounded-[4px] border-y-2  relative bg-white"
    >
      <div
        style={{
          backgroundColor: statusStateObj.washedColor,
        }}
        className="w-full grid grid-cols-2  text-[10px] xl:text-[11px] h-16   "
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
            {Number(currentPiezometer?.lat).toFixed(6)}° /{" "}
            {Number(currentPiezometer?.lon).toFixed(6)}°
          </span>
        </div>
      </div>

      <div className="w-full grid grid-cols-2  text-[10px] xl:text-[11px] h-16   ">
        <div
          style={{
            borderColor: statusStateObj.intermediateColor,
          }}
          className="flex items-center  justify-center px-2 border-r-2 border-b"
        >
          <span className="text-center  font-bold text-[11px] xl:text-xs">
            Section
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
        className="w-full grid grid-cols-2  text-[10px] xl:text-[11px] h-16   "
      >
        <div
          style={{
            borderColor: statusStateObj.intermediateColor,
          }}
          className="flex items-center  justify-center px-2 border-r-2 border-b"
        >
          <span className="text-center  font-bold text-[11px] xl:text-xs">
            Depth:
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
              depthIsZero ? "text-xl" : ""
            }`}
          >
            {depthIsZero
              ? "-"
              : `${Number(currentPiezometer?.depth).toFixed(2)} m`}
          </span>
        </div>
      </div>

      <div className="w-full grid grid-cols-2  text-[10px] xl:text-[11px] h-16   ">
        <div
          style={{
            borderColor: statusStateObj.intermediateColor,
          }}
          className="flex items-center  justify-center px-2 border-r-2 border-b"
        >
          <span className="text-center  font-bold text-[11px] xl:text-xs">
            Status:
          </span>
        </div>

        <div
          style={{
            borderColor: statusStateObj.intermediateColor,
          }}
          className="flex items-center  justify-center px-2 border-b"
        >
          <span className="text-center  font-semibold ">
            {capitalizeName(statusStateObj.name)}
          </span>
        </div>
      </div>

      <div
        style={{
          backgroundColor: statusStateObj.washedColor,
        }}
        className="w-full grid grid-cols-2  text-[10px] xl:text-[11px] h-16   "
      >
        <div
          style={{
            borderColor: statusStateObj.intermediateColor,
          }}
          className="flex items-center  justify-center px-2 border-r-2 border-b"
        >
          <span className="text-center  font-bold text-[11px] xl:text-xs">
            Current PWP:
          </span>
        </div>

        <div
          style={{
            borderColor: statusStateObj.intermediateColor,
          }}
          className="flex items-center  justify-center px-2 border-b"
        >
          <span
            className={`text-center  font-semibold  ${
              lastReadingExists ? "" : "text-xl"
            }`}
          >
            {" "}
            {lastReadingExists
              ? `${Number(lastReading.pressure).toFixed(3)} Kpa`
              : "-"}
          </span>
        </div>
      </div>

      <div className="w-full grid grid-cols-2  text-[10px] xl:text-[11px] h-16   ">
        <div
          style={{
            borderColor: statusStateObj.intermediateColor,
          }}
          className="flex items-center  justify-center px-2 border-r-2 border-b"
        >
          <span className="text-center  font-bold text-[11px] xl:text-xs">
            Last reading at:
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
              lastReadingExists ? "" : "text-xl"
            }`}
          >
            {lastReadingExists
              ? moment(lastReading.time).format("YYYY-MM-DD HH:mm")
              : "-"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PiezoInformationTable;
