import React from "react";
import { BsArrowDownUp } from "react-icons/bs";
import { usePiezometerLecturesStateStore } from "../../store/PiezometerLecturesStateStore";
import { useQuery } from "react-query";
import { fetchLastReadings, fetchPiezometerData } from "../../utils/map";
import { FadeLoader } from "react-spinners";
import { monitoringMapStatusInfo } from "../../utils/monitoringMapStatusInfo";
import { capitalizeName } from "../../utils/monitoringMapStatusInfo";
import { useLocation } from "react-router-dom";
import { useNewPiezoReportStateStore } from "../../store/NewPiezoReportStateStore";
import SkeletonPiezoInformationTable from "../Skeletons/PiezometerLectures/SkeletonPiezoInformationTable";
import { useMonitoringMapStateStore } from "../../store/MonitoringMapStateStore";
import moment from "moment";

function PiezoInformationTable() {
  const paddock = usePiezometerLecturesStateStore((s) => s.paddock);

  const piezo = usePiezometerLecturesStateStore((s) => s.piezo);

  const piezometersData = useMonitoringMapStateStore((s) => s.piezometersData);
  const lastReadings = useMonitoringMapStateStore((s) => s.lastReadings);

  const currentPiezometer = piezometersData.find(
    (p) => p.paddock === paddock && p.id === piezo
  );

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

  if (!currentPiezometer) return <SkeletonPiezoInformationTable />;

  return (
    <div
      style={
        {
          // borderColor: statusStateObj.darkColor,
        }
      }
      className="max-w-[1000vh] h-[19rem] overflow-x-auto rounded-lg border-2  relative bg-white"
    >
      <table className="   select-none w-full border-collapse  bg-white">
        <tbody>
          <tr
            style={{
              backgroundColor: statusStateObj.lightColor,
            }}
            className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] xl:text-[11px] h-12   "
          >
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px] xl:text-xs">
              <span>Location coordinates:</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold ">
              <span>
                {Number(currentPiezometer?.lat).toFixed(8)}° /{" "}
                {Number(currentPiezometer?.lon).toFixed(8)}°
              </span>
            </th>
          </tr>

          <tr className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] xl:text-[11px] h-12 bg-white ">
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px] xl:text-xs">
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
            className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] xl:text-[11px] h-12  "
          >
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px] xl:text-xs">
              <span>Depth:</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <span className={`${depthIsZero ? "text-xl" : ""}`}>
                {depthIsZero
                  ? "-"
                  : `${Number(currentPiezometer?.depth).toFixed(2)} m`}
              </span>
            </th>
          </tr>

          <tr className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] xl:text-[11px] h-12 bg-white ">
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px] xl:text-xs">
              <span>Status:</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <span>{capitalizeName(statusStateObj.name)}</span>
            </th>
          </tr>

          <tr
            style={{
              backgroundColor: statusStateObj.lightColor,
            }}
            className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] xl:text-[11px] h-12  "
          >
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px] xl:text-xs">
              <span>Current PWP</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <span className={`${lastReadingExists ? "" : "text-xl"}`}>
                {" "}
                {lastReadingExists
                  ? `${Number(lastReading.pressure).toFixed(3)} Kpa`
                  : "-"}
              </span>
            </th>
          </tr>

          <tr className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] xl:text-[11px] h-12 bg-white ">
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold  text-[11px] xl:text-xs">
              <span>Last reading at:</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <span className={`${lastReadingExists ? "" : "text-xl"}`}>
                {lastReadingExists
                  ? moment(lastReading.time).format("YYYY-MM-DD HH:mm:ss")
                  : "-"}
              </span>
            </th>
          </tr>
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

export default PiezoInformationTable;
